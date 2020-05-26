class Api::V1::SectorsController < Api::V1::BaseController


  def index
    @sectors = Sector.all
    skip_policy_scope
  end


end
