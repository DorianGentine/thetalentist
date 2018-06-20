class Job < ApplicationRecord
  has_many :talent_jobs, dependent: :destroy
  has_many :talents, through: :talent_jobs

  has_many :job_alertes, dependent: :destroy
  has_many :headhunters, through: :job_alertes


  accepts_nested_attributes_for :talent_jobs, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :talents, allow_destroy: true, reject_if: :all_blank

  accepts_nested_attributes_for :job_alertes, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :headhunters, allow_destroy: true, reject_if: :all_blank
end
