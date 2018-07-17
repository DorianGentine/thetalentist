# frozen_string_literal: true

class Talents::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/plataformatec/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  def linkedin
    talent = Talent.find_for_linkedin_oauth(request.env['omniauth.auth'])
    talentist = Talentist.find_by_email("dimitri@hotmail.fr")
    if talent.persisted?
      if talent.next_aventures.count > 0
        sign_in_and_redirect talent, event: :authentication
        set_flash_message(:notice, :success, kind: 'Linkedin') if is_navigational_format?
      else
        talentist.send_message(talent, "Bonjour #{talent.firstname}, Bienvenue sur notre plateforme!", "#{talent.id}")
        session[:talent_id] = talent.id
        redirect_to steps_talent_info_path(:formations)
      end
    else
      # session['devise.linkedin_data'] = request.env['omniauth.auth']
      redirect_to new_talent_registration_url
    end
  end
end
