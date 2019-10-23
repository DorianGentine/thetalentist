class TalentJob < ApplicationRecord
  belongs_to :talent
  belongs_to :job, optional: true

  # before_validation :set_year

  # before_save :set_position

  validates_presence_of :year, message: "L'année doit être remplie"
  validates_presence_of :job_id, message: "Le métier doit être rempli"

  # attr_accessor :skip_year_validation


  # scope :his_job_is, -> { joins(:job).where("jobs.title LIKE ?", "Sales") }
  scope :his_job_is, -> (job) { joins(:job).where("jobs.title LIKE ?", job) }

  default_scope { order(position: :asc) }

  def set_position
    talent = self.talent
    if talent.talent_jobs.count > 0 && talent.talent_jobs.second == self
      self.position = 2
    else
      self.position = 1
    end
  end

  def set_year
    talent = self.talent
    if talent.talent_jobs.count > 1 && talent.talent_jobs.second == self
      self.year = talent.talent_jobs.first.year
    end
  end

  def skip_year
    talent = self.talent
    if self.job.blank? && talent.talent_jobs.first != self
      return true
    end
  end
  def skip_job
    talent = self.talent
    first = talent.talent_jobs.count > 0 && talent.talent_jobs.first.position.present? ? talent.talent_jobs.where(position: 1).first : nil
    if first == self || first.nil? || !talent.talent_jobs.first.id.nil?
      return true
    else
      return false
    end
  end

  def is_second_job
    talent = self.talent
    first = talent.talent_jobs.count > 0 && talent.talent_jobs.first.position.present? ? talent.talent_jobs.where(position: 1).first : nil
    if first == self || first.nil? || talent.talent_jobs.first.id.nil?
      return false
    else
      return true
    end
  end
end
