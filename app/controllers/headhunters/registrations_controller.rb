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
    p 'on headhunter.new avec les params est créé'
    startup_params = params.require(:headhunter).permit(:startup)[:startup]
    p "le params startup est #{startup_params}"
    authorize @headhunter
    p 'authorisation ok'
    message = "Bonjour #{@headhunter.firstname}, Bienvenue sur notre plateforme! Nous allons vous contacter au plus vite pour vous confirmer l'utilisation de cette plateforme"
    if startup_params.to_i != 0
      p 'on est dans la condition'
      @headhunter.startup_id = startup_params.to_i
      p "headhunter startup est #{@headhunter.startup_id}"
    end
    if @headhunter.save
      p 'on save'
      if @headhunter.startup == nil
        p "startup nil"
        session[:headhunter_id] = @headhunter.id
        p 'goo steps startup avec params'
        redirect_to steps_startup_info_path(:startup, :query => startup_params )
      else
        p 'startup ok'
        @headhunter.send_welcome_email
        p "On envoie le maild e welcome"
        @talentist = Talentist.find_by_email("dimitri@ineva-partners.com")
        @talentist.send_message(@headhunter, message, "#{@headhunter.id}")
        p "On envoie le message"
        session[:headhunter_id] = @headhunter.id
        sign_up(resource)
      end
    else
      'on save PAS'
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

