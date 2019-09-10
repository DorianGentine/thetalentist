# frozen_string_literal: true

class Headhunters::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @headhunter = Headhunter.new
    authorize @headhunter
  end

  def create
    @headhunter = Headhunter.new(headhunter_params)
    startup_params = params.require(:headhunter).permit(:startup)[:startup]
    authorize @headhunter
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
      if @headhunter.startup.address == "" || @headhunter.startup.address.nil?
        session[:headhunter_id] = @headhunter.id
        redirect_to steps_startup_info_path(:startup)
      else
        @headhunter.send_welcome_and_reminder_email
        session[:headhunter_id] = @headhunter.id
        sign_up(resource)
      end
    else
      return render :new
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

      # DO I NEED IT ?
    # def create_new_data_with_only_title(params, table_name)
    #   class_name = table_name.classify.constantize
    #   words = []
    #   params.each do |param|
    #     if param == ""
    #     elsif param.to_i != 0
    #       word_id = param
    #     else
    #       if class_name.where(title: param.capitalize ).count < 1
    #         word = class_name.create(title: param.capitalize )
    #       else
    #         word = class_name.where(title: param.capitalize ).first
    #       end
    #       word_id = word.id.to_s
    #     end
    #     if word_id.present?
    #       words << word_id
    #     end
    #   end
    #   return words
    # end

    def sign_up(resource)
      sign_in(resource)
      redirect_to repertoire_path(query: "new_member")
    end

    def headhunter_params
      params.require(:headhunter).permit(:firstname, :last_name,
        :job, :email, :password, :password_confirmation, :terms_of_condition
      )
    end

    def startup_params
      params.require(:headhunter).permit(:startup)
    end

end

