class Api::V1::JobsController < Api::V1::BaseController


  def index
    # @jobs = Job.all
    @jobs = []
    jobs = Job.all
    jobs.each do |job|
      if job.title.include?("Prod")
        p "job included: #{job.title}"
        @jobs << job
      elsif job.title.include?("Market")
        p "job included: #{job.title}"
        @jobs << job
      elsif job.title.include?("Sal")
        p "job included: #{job.title}"
        @jobs << job
      end
    end
    p "jobs: #{@jobs}"
    skip_policy_scope
  end


end
