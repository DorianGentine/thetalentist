class Api::V1::JobsController < Api::V1::BaseController


  def index
    # @jobs = Job.all
    @jobs = []
    jobs = Job.all
    jobs.each do |job|
      if job.title.include?("Prod")
        @jobs << job
      elsif job.title.include?("Market")
        @jobs << job
      elsif job.title.include?("Sal")
        @jobs << job
      end
    end
    p "jobs: #{@jobs}"
    skip_policy_scope
  end


end
