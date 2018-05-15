class Talents::RegistrationsController < Devise::RegistrationsController

  def new
    super
  end

  def create
    @talent = Talent.new(talent_params)
    if @talent.save
      session[:talent_id] = @talent.id
      redirect_to steps_talent_infos_path
    else
      render :new
      raise
    end
  end

  private

  def talent_params
    params.require(:talent).permit(:firstname, :name, :city, :phone, :email, :password, :cv, :linkedin, job_ids: [])
  end
end
