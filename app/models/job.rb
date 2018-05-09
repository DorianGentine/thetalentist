class Job < ApplicationRecord
  has_many :talent_job, dependent: :destroy
  has_many :talents, through: :talent_jobs
end
