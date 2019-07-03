class Talents::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @talent = Talent.new

    # if @talent.talent_jobs.count == 0
    #   2.times { @talent.talent_jobs.build }
    # elsif @talent.talent_jobs.count == 1
      @talent.build_talent_job if @talent.jobs.count == 0
      @talent.build_talent_second_job if @talent.jobs.count < 2
    # else
    #   0.times { @talent.talent_jobs }
    # end
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
      :zip_code,
      :phone,
      :email,
      :password,
      :password_confirmation,
      :linkedin,
      talent_job_attributes: [ :id, :job_id, :year ],
      talent_second_job_attributes: [ :id, :job_id ]
      )
  end
end
