class Api::V1::TalentsController < Api::V1::BaseController
  include Pagy::Backend

  before_action(
    :authorize_call,
    only: %i[repertoire repertoire_pagy analytics show sort recommandation]
  )

  def repertoire
    @talents = set_talents_repertoire
    @talents = TalentFormat.new.for_api_repository(@talents, current_headhunter)
    @count = { count: @talents.length }
    repertoire = {
      count: @count,
      talents: @talents
    }
    return repertoire
  end

  def repertoire_pagy
    @pagy, @records = pagy(
      set_talents_repertoire,
      items: 9, 
      size: []
    )
    @pagy_metadata = pagy_metadata(@pagy)
    @records = TalentFormat.new.for_api_repository(@records, current_headhunter)
  end

  def analytics
  end

  def index
    @talents = policy_scope(Talent)
    # @talents = policy_scope(set_talents_repertoire())
  end

  def show
    @talent = Talent.find(params[:id])
    @knowns = @talent.knowns || nil
    @skills = @talent.skills || nil
    @technos = @talent.technos || nil
    @talent_languages = @talent.talent_languages || nil
    @next_aventure = @talent.next_aventure
    @mobilities = nil
    @sector_ids = nil
    @sectors = nil
    if @next_aventure
      @mobilities = @next_aventure.mobilities
      @sector_ids = @next_aventure.sector_ids
      @sectors = @next_aventure.sectors
    else
      @next_aventure = NextAventure.create(talent: @talent)
      @mobilities = @next_aventure.mobilities
      @sector_ids = @next_aventure.sector_ids
      @sectors = @next_aventure.sectors
    end
    @job = @talent.talent_job
    @second_job = @talent.talent_second_job
    @jobs = @talent.jobs
    @experiences = @talent.experiences
    @formations = @talent.talent_formations
    authorize @talent
  end

  def sort
    if params[:reorder]
      jobsId = jobs_array
      talents = Talent.joins(:talent_job).where(:visible => true, talent_jobs: { job_id: jobsId }).reorder(completing: :desc, last_sign_in_at: :desc)
      talents.each_with_index do |talent, index|
        talent.update(position: index + 1)
      end
      repertoire = self.repertoire
      @count = repertoire[:count]
      @talents = repertoire[:talents]
    else
      params[:_json].each_with_index do |id, index|
        Talent.where(id: id).update_all(position: index + 1)
      end
    end
    render :repertoire
  end

  def update
    @talent = Talent.find(params[:id])
    if need_to_create_data?
      set_new_skills(@talent) if params[:skill_ids].present?
      set_new_knowns(@talent) if params[:known_ids].present?
      set_new_technos(@talent) if params[:techno_ids].present?
    end

    if params.dig(:talent, :talent_formations_attributes).present?
      params.dig(:talent, :talent_formations_attributes).each do |formation|
        if formation[:formation_id].present? && formation_is_available?(formation[:formation_id])
          formation[:formation_id] = set_new_formations(formation[:formation_id]) 
        end
      end
    end
    if @talent.update(talent_params)
      @talent.experiences.each do |experience|
        set_new_startups(experience.company_name) if startup_is_available?(experience.company_name)
      end
      @knowns = @talent.knowns || nil
      @skills = @talent.skills || nil
      @technos = @talent.technos || nil
      @talent_languages = @talent.talent_languages || nil
      @next_aventure = @talent.next_aventure
      @mobilities = @next_aventure.mobilities
      @sector_ids = @next_aventure.sector_ids
      @sectors = @next_aventure.sectors
      @job = @talent.talent_job
      @second_job = @talent.talent_second_job
      @jobs = @talent.jobs
      @experiences = @talent.experiences
      @formations = @talent.talent_formations
      render :show
    else
      # rediriger message erreur
    end
    authorize @talent
  end
  
  def update_avatar
    @talent = Talent.find(params[:id])
    if @talent.update(talent_photo_params)
      render :show
    else
    end
    authorize @talent
  end
  
  def recommandation
    @talent = Talent.find(params[:id])
    @headhunter = Headhunter.find(params[:recruteur_id])
    @headhunter.send_recommandation(@talent)
  end

  private

  def authorize_call
    user = current_talentist if current_talentist
    user = current_talent if current_talent
    user = current_headhunter if current_headhunter
    authorize user
  end

  def create_new_data_with_only_title(params, table_name)
    class_name = table_name.classify.constantize
    words = []
    params.each do |param|
      if param == ""
      elsif param.to_i != 0
        word_id = param
      else
        if class_name.where(title: param.capitalize ).count < 1
          word = class_name.create(title: param.capitalize )
        else
          word = class_name.where(title: param.capitalize ).first
        end
        word_id = word.id.to_s
      end
      if word_id.present?
        words << word_id
      end
    end
    words
  end

  def set_new_skills(talent)
    skill_params = params.permit(skill_ids: [])[:skill_ids]
    skill_ids = create_new_data_with_only_title(skill_params, "skill")
    talent.skill_ids = skill_ids
  end   
  
  def set_new_knowns(talent)
    known_params = params.permit(known_ids: [])[:known_ids]
    known_ids = create_new_data_with_only_title(known_params, "known")
    talent.known_ids = known_ids
  end
  
  def set_new_technos(talent)
    techno_params = params.permit(techno_ids: [])[:techno_ids]
    techno_ids = create_new_data_with_only_title(techno_params, "techno")
    talent.techno_ids = techno_ids
  end
  
  def startup_is_available?(param)
    if Startup.where(name: param).count > 0 || Startup.where(name: param.upcase).count > 0
      false
    else
      true
    end
  end
  
  def formation_is_available?(param)
    if param.to_i == 0
      if Formation.where(title: param).count > 0 || Formation.where(title: param.upcase).count > 0
        return false
      else
        return true
      end
    else
      false
    end
  end

  def set_new_startups(param)
    if param.present?
      startup = Startup.create(name: param)
      startup.id
    end
  end 
  
  def set_new_formations(param)
    if param.present?
      formation = Formation.create(title: param)
      formation.id
    end
  end 
  
  def need_to_create_data?
    skill_params = params.permit(skill_ids: [])[:skill_ids]
    known_params = params.permit(known_ids: [])[:known_ids]
    techno_params = params.permit(techno_ids: [])[:techno_ids]

    skill_params.present? || known_params.present? || techno_params.present?
  end

  def jobs_array
    jobs = Job.all
    jobs_filtered = []
    jobs.each do |job|
      if job.title.include?("Prod") || job.title.include?("Market") || job.title.include?("Sal")
        jobs_filtered << job.id
      end
    end
    jobs_filtered
  end

  def set_talents_repertoire
    jobsId = jobs_array
    @talents = Talent.joins(:talent_job).where(:visible => true, talent_jobs: { job_id: jobsId })
      .reorder(position: :asc, completing: :desc, last_sign_in_at: :desc)
    @talents
  end

  def talent_photo_params
    params.permit(
      :photo
    )
  end
  
  def talent_params
    return {} if params[:talent].blank?

    params.require(:talent).permit(
      :firstname,
      :last_name,
      :overview,
      :phone,
      :linkedin,
      :city,
      :btoc,
      :btob,
      :terms_of_condition,
      :no_more,
      :sector_ids,
      :photo,
      :terms_of_condition,
      hobby_ids: [],
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :type_of_formation, :_destroy],
      next_aventure_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), sector_ids: [], mobilities_attributes:[ Mobility.attribute_names.map(&:to_sym).push(:_destroy)]],
      talent_job_attributes: [:id, :job_id, :year, :position, :_destroy],
      talent_second_job_attributes: [ :id, :job_id, :_destroy ],
      talent_languages_attributes: [:id, :language_id, :_destroy]
    )
  end
end

# talent_formations_attributes: [ :id, :title, :year, :formation_id, :_destroy],
# talent_languages_attributes: [ :id, :level, :language_id, :_destroy],
# your_small_plus_attributes: [:id, :description, :_destroy],
# talent_skill_attributes: [:id, :skill_id, :_destroy],