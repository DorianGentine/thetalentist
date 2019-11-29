class Api::V1::JobsController < Api::V1::BaseController


  def index
    @jobs = Job.all
    skip_policy_scope
  end


end
