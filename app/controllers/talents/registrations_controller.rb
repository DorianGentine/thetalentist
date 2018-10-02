class Talents::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @talent = Talent.new
    authorize @talent

    @talent.talent_jobs.build

  end

  def create
    # TODO envoyer un email de bienvenue
    @talent = Talent.new(talent_params)
    authorize @talent
    if @talent.save
      session[:talent_id] = @talent.id
      redirect_to steps_talent_info_path(:formations)
    else
      render :new
    end
  end

# faire update dans ici


  private

  def talent_params
    params.require(:talent).permit(
      :firstname,
      :name,
      :city,
      :phone,
      :email,
      :password,
      :password_confirmation,
      :cv,
      :linkedin,
      :job_ids,
      hobby_ids: [],
      talent_jobs_attributes: [ :id, :job_id, :year]
      )
  end
end
