class CompletedTalent


  def initialize(talent)
    @talent = talent
  end


  def completed_profil
    count = 0
    value_input = stat(8)
    @talent.firstname.present? ? count += value_input : count
    @talent.last_name.present? ? count += value_input : count
    @talent.photo? || @talent.display_linkedin? ? count += value_input : count
    @talent.phone.present? ? count += value_input : count
    @talent.city.present? ? count += value_input : count
    @talent.linkedin.present? ? count += value_input : count
    @talent.jobs.first.present? ? count += value_input : count
    if @talent.talent_job.present?
      @talent.talent_job.year.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_formation_language
    count = 0
    formation_count = @talent.talent_formations.size > 0 ? @talent.talent_formations.size * 3 : 3
    language_count = 1
    value_input = stat(formation_count + language_count)
    if @talent.talent_formations.count > 0
      @talent.talent_formations.each do |talent_formation|
        talent_formation.formation_id.present? ? count += value_input : count
        talent_formation.year.present? ? count += value_input : count
        talent_formation.title.present? ? count += value_input : count
      end
    end
    if @talent.talent_languages.count > 0
      @talent.talent_languages.first.language_id.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_known_skill_technos
    count = 0
    knowns_count = 1
    skills_count = 1
    technos_count = 1
    value_input = stat(knowns_count + skills_count + technos_count)
    if @talent.known_ids.count > 0
      @talent.known_ids.first.present? ? count += value_input : count
    end
    if @talent.skill_ids.count > 0
      @talent.skill_ids.first.present? ? count += value_input : count
    end
    if @talent.techno_ids.count > 0
      @talent.techno_ids.first.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_experience
    count = 0
    experiences_count = @talent.experiences.size > 0 ? @talent.experiences.size * 6 : 6
    value_input = stat(experiences_count)
    @talent.experiences.each do |experience|
      experience.position.present? ? count += value_input : count
      experience.starting.present? ? count += value_input : count
      experience.currently || experience.years.present? ? count += value_input : count
      experience.overview.present? ? count += value_input : count
      experience.company_name.present? ? count += value_input : count
      experience.company_type_id.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_next_aventure
    count = 0
    next_aventure_count = 10
    value_input = stat(next_aventure_count)
    next_aventure = @talent.next_aventure
    if next_aventure
      next_aventure.mobilities.count > 0 ? count += value_input : count
      next_aventure.contrat.present? ? count += value_input : count
      next_aventure.remuneration.present? ? count += value_input : count
      next_aventure.sector_ids.count > 0 ? count += value_input : count
      next_aventure.availability.present? ? count += value_input : count
      next_aventure.waiting_for_one.present? ? count += value_input : count
      next_aventure.looking_for.present? ? count += value_input : count
      next_aventure.good_manager.present? ? count += value_input : count
      next_aventure.proud.present? ? count += value_input : count
      next_aventure.see_my_job.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_totaly
    all_parts = completed_profil + completed_formation_language + completed_known_skill_technos + completed_experience + completed_next_aventure
    result = all_parts / 5.0
    return result.round(1)
  end

  private


  def stat(arg)
    total_completed = 100.00
    return total_completed / arg
  end

end
