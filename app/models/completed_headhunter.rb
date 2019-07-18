class CompletedHeadhunter


  def initialize(headhunter)
    @headhunter = headhunter
  end

  def completed_totaly
    all_parts = completed_profil + completed_pictures + completed_startup
    result = all_parts / 3.0
    return result.round(1)
  end

  def completed_profil
    count = 0
    headhunters_count = @headhunter.startup.headhunters.size * 4
    value_input = stat(headhunters_count + 6)
    @headhunter.startup.headhunters.each do |headhunter|
      headhunter.firstname.present? ? count += value_input : count
      headhunter.last_name.present? ? count += value_input : count
      headhunter.job.present? ? count += value_input : count
      headhunter.photo? ? count += value_input : count
    end
    @headhunter.startup.name.present? ? count += value_input : count
    @headhunter.startup.logo? ? count += value_input : count
    @headhunter.startup.link.present? ? count += value_input : count
    @headhunter.startup.address.present? ? count += value_input : count
    @headhunter.startup.short_resume.present? ? count += value_input : count
    @headhunter.startup.linkedin.present? ? count += value_input : count
    # @headhunter.startup.facebook.present? ? count += value_input : count
    return count.round(0)
  end

  def completed_pictures
    count = 0
    pictures_count = @headhunter.startup.pictures.size * 1
    value_input = stat(pictures_count)
    @headhunter.startup.pictures.each do |picture|
      picture.photo? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_startup
    count = 0
    value_input = stat(8)
    @headhunter.startup.year_of_creation.present? ? count += value_input : count
    @headhunter.startup.sectors.first.present? ? count += value_input : count
    @headhunter.startup.collaborators.present? ? count += value_input : count
    @headhunter.startup.btoc || @headhunter.startup.btob ? count += value_input : count
    @headhunter.startup.average_age.present? ? count += value_input : count
    @headhunter.startup.words.present? ? count += value_input : count
    @headhunter.startup.overview.present? ? count += value_input : count
    @headhunter.startup.mission.present? ? count += value_input : count
    return count.round(0)
  end

  private

  def stat(arg)
    length_input = arg
    total_completed = 100.00
    value_input = total_completed / length_input
  end

end
