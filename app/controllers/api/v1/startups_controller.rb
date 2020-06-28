class Api::V1::StartupsController < Api::V1::BaseController


  def index
    @startups = Startup.all
    skip_policy_scope
  end


end
