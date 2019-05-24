class TalentFormat

  def initialize(talents)
    @talents = talents
  end

  def for_repository
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
      if talent.next_aventures.count > 0
        talent.next_aventures.first.sectors.each do |talent_sector|
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
        position: talent.experiences.first.present? ? talent.experiences.first.position : nil,
        year_experience_job: talent.talent_job.present? ? talent.talent_job.year : "0",
        city: talent.city,
        job: talent.jobs.first.present? ? talent.jobs.first.title : nil,
        job2: talent.jobs.second.present? ? talent.jobs.second.title : nil,
        overview: talent.overview,
        connection: talent.last_sign_in_at.present? ? talent.last_sign_in_at : 1.month.ago,
        next_aventure: {
          famous_person: talent.next_aventures.count > 0 && talent.next_aventures.first.famous_person.present? ? talent.next_aventures.first.famous_person : false,
          work_for_free: talent.next_aventures.count > 0 && talent.next_aventures.first.work_for_free.present? ? talent.next_aventures.first.work_for_free : false,
          btob: talent.next_aventures.count > 0 && talent.next_aventures.first.btob.present? ? true : false,
          btoc: talent.next_aventures.count > 0 && talent.next_aventures.first.btoc.present? ? true : false,
        },
        sectors: talent_sectors,
        formations: talent_formations,
        experiences: talent_experiences,
        technos: talent_technos,
        talent_small_plus: your_small_plus,
      }

      @new_talents << talent_injected
    end
    return @new_talents
  end
end
