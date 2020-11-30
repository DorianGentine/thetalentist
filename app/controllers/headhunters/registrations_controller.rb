# frozen_string_literal: true

class Headhunters::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @headhunter = Headhunter.new
    @headhunter.build_headhunter_email
    authorize @headhunter
  end

  def create
    @headhunter = Headhunter.new(headhunter_params)
    startup_params = params.require(:headhunter).permit(:startup)[:startup]
    authorize @headhunter
    success = verify_recaptcha(action: 'registration', minimum_score: 0.8, secret_key: ENV['RECAPTCHA_SECRET_KEY_V3'])
    p "verify_recaptcha: #{success}"
    p "score: #{recaptcha_reply.present? ? recaptcha_reply['score'] : nil}"
    checkbox_success = verify_recaptcha unless success
    if success || checkbox_success
      @headhunter.validated = true
      if startup_params.to_i != 0
        @headhunter.startup_id = startup_params.to_i
      else
        if startup_is_available?(startup_params)
          @headhunter.startup_id = set_new_startups(startup_params)
        else
        return render :new
        end
      end
      if @headhunter.save
        message = "Bonjour #{@headhunter.firstname}, bienvenue sur notre plateforme !"
        @talentist = Talentist.last
        @talentist.send_message(@headhunter, message, "#{@headhunter.id}")
        @headhunter.send_welcome_and_reminder_email
        session[:headhunter_id] = @headhunter.id
        sign_up(resource)
      else
        return render :new
      end
    else
      if !success
        @show_checkbox_recaptcha = true
      end
      render :new
    end
  end

  protected

    def after_update_path_for(resource)
      headhunter_path(resource)
    end


  private

    def startup_is_available?(param)
      if Startup.where(name: param).count > 0 || Startup.where(name: param.upcase).count > 0
        return false
      else
        return true
      end
    end

    def set_new_startups(param)
      if param.present?
        startup = Startup.create(name: param)
        return startup.id
      end
    end

    def sign_up(resource)
      sign_in(resource)
      redirect_to repertoire_path(query: "new_member")
    end

    def headhunter_params
      params.require(:headhunter).permit(
        :firstname, 
        :last_name,
        :job, 
        :email, 
        :password, 
        :phone,
        :linkedin, 
        :password_confirmation, 
        :terms_of_condition, 
        headhunter_email_attributes: [:newletter]
      )
    end

    def startup_params
      params.require(:headhunter).permit(:startup)
    end

end

