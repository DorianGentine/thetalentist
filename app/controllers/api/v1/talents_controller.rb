class Api::V1::TalentsController < Api::V1::BaseController
  before_action :autorize_call, only: [:repertoire, :analytics, :show, :sort]

  def repertoire
    talents = Talent.where(:visible => true).reorder(position: :asc, completing: :desc, last_sign_in_at: :desc)
    @talents = TalentFormat.new.for_api_repository(talents, current_headhunter)
    @conversation_id = current_user.mailbox.conversations.first
    if current_user.mailbox.conversations.first
      @conversation_id = @conversation_id.id
    end
    @user = current_user
    p "TEST => #{current_headhunter}"
  end

  def analytics
  end

  def index
    @talents = policy_scope(Talent)
  end

  def show
    @talent = Talent.find(params[:id])
    @knowns = @talent.knowns || nil
    @skills = @talent.skills || nil
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
    params[:_json].each_with_index do |id, index|
      Talent.where(id: id).update_all(position: index + 1)
    end
    head :ok
  end

  def update
    @talent = Talent.find(params[:id])
    if need_to_create_data?
      if params[:skill_ids].present?
        set_new_skills(@talent)
      end
      if params[:known_ids].present?
        set_new_knowns(@talent)
      end
    end
    if params[:talent_formations_attributes].present?
      params[:talent_formations_attributes].each do |formation|
        if formation_is_available?(formation[:formation_id])
          formation[:formation_id] = set_new_formations(formation[:formation_id]) 
        end
      end
    end
    p "Talent formations #{@talent.formations}"
    p "Talent TalentFormations #{@talent.talent_formations}"
    if @talent.update(talent_params)
      @talent.experiences.each do |experience|
        p "SALUT, ON COMMENCE :"
        set_new_startups(experience.company_name) if startup_is_available?(experience.company_name)
      end
      render :show
    else
      # rediriger message erreur
    end
    authorize @talent
  end

  private

  def autorize_call
    user = current_talentist if current_talentist
    user = current_talent if current_talent
    user = current_headhunter if current_headhunter
    p "USER: #{current_user}"
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
    return words
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
  
  def startup_is_available?(param)
    if Startup.where(name: param).count > 0 || Startup.where(name: param.upcase).count > 0
      return false
    else
      return true
    end
  end
  
  def formation_is_available?(param)
    p "FORMATION: #{param.to_i == 0}"
    if param.to_i == 0
      if Formation.where(title: param).count > 0 || Formation.where(title: param.upcase).count > 0
        return false
      else
        return true
      end
    else
      return false
    end
  end

  def set_new_startups(param)
    p "ON CREE LA SU"
    if param.present?
      startup = Startup.create(name: param)
      p "STARTUP: #{startup}"
      return startup.id
    end
  end 
  
  def set_new_formations(param)
    p "ON CREE LA Formation"
    if param.present?
      formation = Formation.create(title: param)
      p "FORMATION: #{formation.id}"
      return formation.id
    end
  end 
  
  def need_to_create_data?
    skill_params = params.permit(skill_ids: [])[:skill_ids]
    known_params = params.permit(known_ids: [])[:known_ids]
    if skill_params.nil? && known_params.nil?
      return false
    else
      return true
    end
  end

  def talent_params
    params.require(:talent).permit(
      :firstname,
      :last_name,
      :phone,
      :linkedin,
      :city,
      :btoc,
      :btob,
      :terms_of_condition,
      :no_more,
      :sector_ids,
      :photo,
      hobby_ids: [],
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :type_of_formation, :_destroy],
      next_aventure_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), sector_ids: [], mobilities_attributes:[ Mobility.attribute_names.map(&:to_sym).push(:_destroy)]],
      talent_job_attributes: [:id, :job_id, :year, :position, :_destroy],
      talent_second_job_attributes: [ :id, :job_id ]
    )
  end
end

# talent_formations_attributes: [ :id, :title, :year, :formation_id, :_destroy],
# talent_languages_attributes: [ :id, :level, :language_id, :_destroy],
# your_small_plus_attributes: [:id, :description, :_destroy],
# talent_skill_attributes: [:id, :skill_id, :_destroy],