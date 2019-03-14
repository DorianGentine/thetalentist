class Talents::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @talent = Talent.new

  # @talent_job = TalentJob.new(talent: @talent)
  # @talent_job.skip_year_validation = true
  # @talent_job.save

    authorize @talent
    @talent.talent_jobs.build
  end

  def create
    # TODO envoyer un email de bienvenue
    @talent = Talent.new(talent_params)
    authorize @talent
    @talent.skip_city_validation = true
    @talent.skip_phone_validation = true
    if @talent.save
      session[:talent_id] = @talent.id
      redirect_to steps_talent_info_path(:formations)
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
      :name,
      :city,
      :phone,
      :email,
      :password,
      :password_confirmation,
      :linkedin,
      talent_jobs_attributes: [ :id, :job_id, :year ]
      )
  end
end
