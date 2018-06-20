class StartupsController < ApplicationController
  def update
    @startup = Startup.find(params[:id])
    @startup.btob = false
    @startup.btoc = false
    raise
    if @startup.update_attributes(startup_params)

      redirect_to headhunter_path(@current_headhunter)
    end
    authorize @current_headhunter
  end

private
  def startup_params
    params.require(:startup).permit(
      :id, :name, :link, :logo, :address, :sector_ids, :btob, :btoc, :validated,
      :average_age, :collaborators, :year_of_creation, :overview,
      :linkedin, :facebook, :mission, word_ids: []
      )
  end
end
