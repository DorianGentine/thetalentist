class Api::V1::KnownsController < Api::V1::BaseController

  def index
    @knowns = Known.all
    skip_policy_scope
  end


end