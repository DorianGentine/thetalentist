class StartupsController < ApplicationController
  def update
    @startup = Startup.find(params[:id])
    @startup.btob = false
    @startup.btoc = false
    if @startup.update_attributes(startup_params)

      redirect_to headhunter_path(@current_headhunter)
    end
    authorize @current_headhunter
  end

private
  def startup_params
    params.require(:startup).permit(
      :id, :name, :link, :logo, :address, :sector_ids, :btob, :btoc, :validated, :short_resume,
      :average_age, :collaborators, :year_of_creation, :overview,
      :linkedin, :facebook, :mission, { pictures:[] }, word_ids: [],
      pictures_attributes: [ :id, :photo ]
      )
  end
end
