class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :experiences, :formations, :skills
  # TODO: before actions add find_talent for show and update

  def show
    @talent = Talent.find(session[:talent_id]) || current_talent
    @talent.talent_sectors.build
    # @talent.talent_skill.build
    @sectors = Sector.all
    render_wizard
  end

  def update
    @sectors = Sector.all
    @talent = Talent.find(session[:talent_id])
      # @talent.sectors = params_sector[:sector_id].present? ? Sector.find(params_sector[:sector_id][1].to_i) : []

    if @talent.update(params_sector)
      @talent.sectors = params_sector.require(:sector_ids)
      raise
      render_wizard
    else
      raise
    end
  end

  private

  # user.roles = params[:role_ids].present? ? Role.find_all_by_id(params[:role_ids]) : [ ]

  def find_talent
    @talent = Talent.find(session[:talent_id])
  end

  def params_sector
    # params.require(:talent).require(:talent_sectors_attributes).require(:"0")
    params.require(:talent).permit(:sector_ids => [])
  end

end



