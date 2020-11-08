class Talents::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @talent = Talent.new
    authorize @talent
  end

  def create
    @talent = Talent.new(talent_params)
    authorize @talent
    success = verify_recaptcha(action: 'registration', minimum_score: 0.8, secret_key: ENV['RECAPTCHA_SECRET_KEY_V3'])
    p "verify_recaptcha: #{success}"
    p "score: #{recaptcha_reply.present? ? recaptcha_reply['score'] : nil}"
    checkbox_success = verify_recaptcha unless success
    if success || checkbox_success
      if @talent.save
        session[:talent_id] = @talent.id
        sign_in(@talent)
        redirect_to welcome_talent_path(@talent)
      else
        render :new
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
    talent_path(resource)
  end


  private

  def talent_params
    params.require(:talent).permit(
      :firstname,
      :last_name,
      :phone,
      :email,
      :password,
      :password_confirmation,
      :terms_of_condition,
      :linkedin
      )
  end
end
