class TalentFormat

  def for_repository(talents)
    return set_talents(talents, false)
  end

  def for_api_repository(talents, headhunter)
    return set_talents(talents, headhunter)
  end

  def talent(talent)
    talent_json = {
      talent: talent,
      experiences: talent.experiences,
      talent_formations: talent.talent_formations,
      languages: talent.languages
    }
    return talent_json
  end

  private

  def set_talents(talents, headhunter)
    @talents = talents
    @new_talents = []
    @talents.each do |talent|

      talent_formations = []
      talent.talent_formations.each do |talent_formation|
        if talent_formation.present?
          formation_injected = {
            title: talent_formation.title,
            # TODO change later when all talent will have type of formation from formation
            type_of_formation: talent_formation.formation.type_of_formation.present? ? talent_formation.formation.type_of_formation : talent_formation.type_of_formation,
            ranking: talent_formation.formation.ranking.present? ? talent_formation.formation.ranking : nil,
            year: talent_formation.year
          }
        end
        talent_formations << formation_injected
      end

      talent_sectors = []
      if talent.next_aventure.present?
        talent.next_aventure.sectors.each do |talent_sector|
          sector_injected = {
            title: talent_sector.present? ? talent_sector.title : nil,
          }
          talent_sectors << sector_injected
        end
      end

      talent_experiences = []
      talent.experiences.each do |experience|
        experience_injected = {
          position: experience.position.present? ? experience.position : false,
          company_type: experience.company_type.present? ? experience.company_type.title : false,
          starting: experience.starting.present? ? experience.starting_display : false,
          currently: experience.currently ? "Aujourd'hui" : false,
          years: experience.years.present? ? experience.years_display : false,
        }
        talent_experiences << experience_injected
      end

      talent_technos = []
      talent.technos.each do |talent_techno|
        techno_injected = {
          title: talent_techno.title
        }
        talent_technos << techno_injected
      end

      your_small_plus = []
      talent.your_small_plus.each do |small_plu|
        small_plu_injected = {
          description: small_plu.description
        }
        your_small_plus << small_plu_injected
      end

      talent_injected = {
        id: talent.id,
        first_name: talent.firstname,
        last_name: talent.last_name,
        completing: talent.completing,
        position: talent.experiences.first.present? ? talent.experiences.first.position : nil,
        company_id: talent.experiences.first.present? ? talent.startup_id : nil,
        year_experience_job: talent.talent_job.present? ? talent.talent_job.year : "0",
        city: talent.city,
        relationship: headhunter.present? ? set_relationship(talent, headhunter) : nil,
        pin: headhunter.present? ? set_pin(talent, headhunter) : nil,
        job: talent.jobs.first.present? ? talent.jobs.first.title : nil,
        job2: talent.jobs.second.present? ? talent.jobs.second.title : nil,
        overview: talent.overview,
        connection: talent.last_sign_in_at.present? ? talent.last_sign_in_at : 1.month.ago,
        next_aventure: {
          remuneration: talent.next_aventure.present? && talent.next_aventure.remuneration.present? ? talent.next_aventure.remuneration : false,
          famous_person: talent.next_aventure.present? && talent.next_aventure.famous_person.present? ? talent.next_aventure.famous_person : false,
          work_for_free: talent.next_aventure.present? && talent.next_aventure.work_for_free.present? ? talent.next_aventure.work_for_free : false,
          looking_for: talent.next_aventure.present? && talent.next_aventure.looking_for.present? ? talent.next_aventure.looking_for : false,
          dream: talent.next_aventure.present? && talent.next_aventure.dream.present? ? talent.next_aventure.dream : false,
          good_manager: talent.next_aventure.present? && talent.next_aventure.good_manager.present? ? talent.next_aventure.good_manager : false,
          proud: talent.next_aventure.present? && talent.next_aventure.proud.present? ? talent.next_aventure.proud : false,
          btob: talent.next_aventure.present? && talent.next_aventure.btob.present? ? true : false,
          btoc: talent.next_aventure.present? && talent.next_aventure.btoc.present? ? true : false,
        },
        sectors: talent_sectors,
        formations: talent_formations,
        experiences: talent_experiences,
        technos: talent_technos,
        talent_small_plus: your_small_plus,
      }

      # p "injected talent #{talent_injected}"
      @new_talents << talent_injected
    end
    return @new_talents
  end

  def set_relationship(talent, headhunter)
    relationship = Relationship.where(talent: talent, headhunter: headhunter)
    relationship.present? ? relationship.first.status : false
  end
  def set_pin(talent, headhunter)
    Pin.where(talent: talent, headhunter: headhunter).count > 0 ? true : false
  end

end
