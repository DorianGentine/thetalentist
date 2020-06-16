class Talents::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @talent = Talent.new
    authorize @talent
  end

  def create
    # TODO envoyer un email de bienvenue
    @talent = Talent.new(talent_params)
    authorize @talent

    # @talent.skip_city_validation = true
    # @talent.skip_phone_validation = true
    if @talent.save
      session[:talent_id] = @talent.id
      sign_in(@talent)
      redirect_to welcome_talent_path(@talent)
    else
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
