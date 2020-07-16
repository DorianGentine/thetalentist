class Api::V1::FormationsController < Api::V1::BaseController


  def index
    @formations = Formation.all
    skip_policy_scope
  end


end
