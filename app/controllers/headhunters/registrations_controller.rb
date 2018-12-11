# frozen_string_literal: true

class Headhunters::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @headhunter = Headhunter.new
    authorize @headhunter
  end

  def create

    startup_params = params.require(:headhunter).permit(:startup)[:startup]
    @headhunter = Headhunter.new(headhunter_params)
    authorize @headhunter
    message = "Bonjour #{@headhunter.firstname}, Bienvenue sur notre plateforme! Nous allons vous contacter au plus vite pour vous confirmer l'utilisation de cette plateforme"
    if startup_params.to_i != 0
      @headhunter.startup_id = startup_params.to_i
    end
    if @headhunter.save
      if @headhunter.startup == nil
        session[:headhunter_id] = @headhunter.id
        redirect_to steps_startup_info_path(:startup, :query => startup_params )
      else
        @talentist = Talentist.find_by_email("dimitri@ineva-partners.com")
        @talentist.send_message(@headhunter, message, "#{@headhunter.id}")
        session[:headhunter_id] = @headhunter.id
        sign_up(resource)
      end
    else
      render :new
    end
  end

  private


    def sign_up(resource)
      sign_in(resource)
      redirect_to headhunter_path(resource)
    end

    def headhunter_params
      params.require(:headhunter).permit(:firstname, :name,
        :job, :email, :password, :password_confirmation, :terms_of_condition
      )
    end

    def startup_params
      params.require(:headhunter).permit(:startup)
    end

end

