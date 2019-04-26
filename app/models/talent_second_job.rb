class TalentSecondJob < ApplicationRecord
  belongs_to :talent
  belongs_to :job


  scope :his_job_is, -> (job) { joins(:job).where("jobs.title LIKE ?", job) }

end
