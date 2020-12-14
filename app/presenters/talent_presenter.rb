class TalentPresenter
  delegate :jobs, :experiences, :talent_job, :next_aventure, :sectors, to: :@talent

  def initialize(talent)
    @talent = talent
  end

  def photo_seed
    rand(2..8)
  end

  def first_job_title
    jobs.first&.title.to_s
  end

  def position
    @talent.overview || experiences.first&.position.to_s.capitalize
  end

  def years_of_experience
    talent_job&.year.to_i
  end

  def can_work_remotely?
    return false if next_aventure.blank?

    next_aventure.mobilities.find { |mobility| mobility.remote_mobility? }.present?
  end

  def remuneration
    next_aventure&.remuneration
  end

  def looking_for
    next_aventure&.looking_for
  end

  def mobilities_list
    return '' if next_aventure.blank?

    @mobilities_list ||= next_aventure.mobilities.map(&:title).join(', ')
  end

  def sectors_list
    return '' if next_aventure.blank?

    @sectors_list ||= next_aventure.sectors.map(&:title).join(' ')
  end
end
