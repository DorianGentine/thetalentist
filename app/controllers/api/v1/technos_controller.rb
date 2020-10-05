class Api::V1::TechnosController < Api::V1::BaseController


  def index
    @technos = Techno.all
    skip_policy_scope
  end


end
