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
    p "COMP PROFIL: #{count}"
    return count.round(0)
  end

  def completed_formation_skill_language
    count = 0
    formation_count = @talent.talent_formations.size > 0 ? @talent.talent_formations.size * 3 : 3
    language_count = @talent.talent_languages.size > 0 ? @talent.talent_languages.size * 1 : 1
    technos_count = @talent.techno_ids.size > 0 ? @talent.techno_ids.size * 1 : 1
    value_input = stat(formation_count + language_count + technos_count)
    if @talent.talent_formations.count > 0
      @talent.talent_formations.each do |talent_formation|
        talent_formation.formation_id.present? ? count += value_input : count
        talent_formation.year.present? ? count += value_input : count
        talent_formation.title.present? ? count += value_input : count
        # talent_formation.level.present? ? count += value_input : count
        # talent_formation.type_of_formation.present? ? count += value_input : count
      end
    end
    if @talent.talent_languages.count > 0
      @talent.talent_languages.each do |talent_language|
        talent_language.language_id.present? ? count += value_input : count
        # talent_language.level.present? ? count += value_input : count
      end
    end
    if @talent.techno_ids.count > 0
      @talent.techno_ids.each do |techno_id|
        techno_id.present? ? count += value_input : count
        # talent_skill.level.present? ? count += value_input : count
      end
    end
    p "COMP FORMATION_SKILL: #{count}"
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
    p "COMP EXPERIENCE: #{count}"
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
      # next_aventure.waiting_for_two.present? ? count += value_input : count
      # next_aventure.waiting_for_three.present? ? count += value_input : count
      next_aventure.looking_for.present? ? count += value_input : count
      next_aventure.good_manager.present? ? count += value_input : count
      next_aventure.proud.present? ? count += value_input : count
      next_aventure.see_my_job.present? ? count += value_input : count
      # next_aventure.btob || next_aventure.btoc ? count += value_input : count
      # next_aventure.hunter_or_breeder.present? ? count += value_input : count
      # next_aventure.creative_or_pragmatic.present? ? count += value_input : count
    end
    p "COMP NEXT_AVENTURE: #{count}"
    return count.round(0)
  end

  def completed_totaly
    if completed_profil != nil && completed_formation_skill_language != nil && completed_experience != nil && completed_next_aventure != nil
      all_parts = completed_profil + completed_formation_skill_language + completed_next_aventure + completed_experience
      result = all_parts / 4.0
      return result.round(1)
    else
      return 0
    end
  end

  private


  def stat(arg)
    total_completed = 100.00
    return total_completed / arg
  end

end
