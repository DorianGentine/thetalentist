class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :user_informations, :formations, :experiences, :next_aventure

  before_action :find_talent, only: [:show, :update]
  skip_after_action :verify_authorized
  skip_before_action :authenticate!
  skip_before_action :current_user

  def show
    @talent.set_build_belong_tables
    if @talent.next_aventure.mobilities.count > 0
      @mobilities = @talent.next_aventure.mobilities
    else
      @mobilities = Mobility.new
    end
    render_wizard
  end

  def update
    # une fois que tu auras plusieurs étapes, il faudra ajouter un champ "status" et le mettre à jour comme suit :
    # Si tu as un problème de validation pour créer talent
    # @talent.status = step.to_s
    # @talent.status = 'active' if step == steps.last
    case step
    when :next_aventure
      @talent.update_attributes(talent_params)
      if !@talent.terms_of_condition
        flash[:notice] = "N'oubliez pas de accepter les conditions générale"
        render "steps_talent_infos/#{step}"
      else
        render_wizard @talent
      end
    when :experiences
      @talent.attributes = talent_params
      @talent.experiences.each do |experience|
        experience.skip_position_validation = true
        experience.skip_company_name_validation = true
        experience.skip_starting_validation = true
        experience.skip_currently_validation = true
        set_new_startups(experience.company_name) if startup_is_available?(experience.company_name)
      end
      if @talent.save
        @talent.experiences.each do |experience|
          experience.nothing_to_save
        end
        render_wizard @talent
      else
        render "steps_talent_infos/#{step}"
      end
    else
      if need_to_create_data?
        set_new_technos(@talent)
        set_new_skills(@talent)
        # set_new_knowns(@talent)
      end
      @talent.attributes = talent_params
      [*0..5].each do |index|
        if need_to_create_formation?(index)
          @talent.talent_formations[index].formation = set_new_formation(@talent, need_to_create_formation?(index) )
        end
      end

      @talent.skip_city_validation = true
      if @talent.save
        # @talent = current_user
        render_wizard @talent
      else
        # si l'update ne fonctionne pas, il faut render l'étape sur laquelle tu te trouves donc tu as besoin de la connaître
        # ça render la méthode "show" mais propre à UNE étape en particulier, donc tu dois la nommer explicitement et pas juste "show"
        render "steps_talent_infos/#{step}"
      end
    end
  end

  private

# cela ne suffit pas de déclarer current_user = @talent, il faut un sign_in

  def finish_wizard_path
    if @talent.terms_of_condition
      if @talent.validated
        sign_in(@talent)
        talent_path(@talent)
      else
        @talent.send_candidate_and_user_information
        waiting_for_validation_path
      end
    else
      render "steps_talent_infos/next_aventure"
    end
  end

  def find_talent
    if session[:talent_id]
      @talent = Talent.find(session[:talent_id])
    else
      @talent = current_talent
    end
  end

  def startup_is_available?(param)
    if Startup.where(name: param).count > 0 || Startup.where(name: param.upcase).count > 0
      return false
    else
      return true
    end
  end

  def set_new_startups(param)
    if param.present?
      startup = Startup.create(name: param)
      return startup.id
    end
  end

  def set_new_formation(talent, formation)
    formation = Formation.find_or_create_by(title: formation)
    return formation
  end


  def set_new_technos(talent)
    techno_params = params.require(:talent).permit(techno_ids: [])[:techno_ids]
    techno_ids = create_new_data_with_only_title(techno_params, "techno")
    talent.techno_ids = techno_ids
  end

  def set_new_skills(talent)
    skill_params = params.require(:talent).permit(skill_ids: [])[:skill_ids]
    skill_ids = create_new_data_with_only_title(skill_params, "skill")
    talent.skill_ids = skill_ids
  end

  # def set_new_knowns(talent)
  #   known_params = params.require(:talent).permit(known_ids: [])[:known_ids]
  #   known_ids = create_new_data_with_only_title(known_params, "known")
  #   talent.known_ids = known_ids
  # end

  def need_to_create_data?
    techno_params = params.require(:talent).permit(techno_ids: [])[:techno_ids]
    skill_params = params.require(:talent).permit(skill_ids: [])[:skill_ids]
    # known_params = params.require(:talent).permit(known_ids: [])[:known_ids]
    if skill_params.nil? || techno_params.nil?
      return false
    else
      return true
    end
  end

  def need_to_create_formation?(index)
    formation_params_ok = params[:talent][:talent_formations_attributes]
    formation_params = formation_params_ok.present? ? params[:talent][:talent_formations_attributes][index.to_s] : nil
    return false if formation_params.nil?
    if formation_params[:formation_id].to_i.to_s == formation_params[:formation_id]
      return false
    else
      if formation_params[:title].present?
        return formation_params[:formation_id].nil? ? false : formation_params[:formation_id]
      else
        return false
      end
    end
  end


  def talent_params
     params.require(:talent).permit(
      :last_name,
      :firstname,
      :phone,
      :linkedin,
      :city,
      :btoc,
      :btob,
      :terms_of_condition,
      :no_more,
      :sector_ids,
      hobby_ids: [],
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
      next_aventure_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), sector_ids: [], mobilities_attributes:[:id, :title, :_destroy]],
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :_destroy],
      talent_languages_attributes: [ :id, :level, :language_id, :_destroy],
      your_small_plus_attributes: [:id, :description, :_destroy],
      talent_job_attributes: [:id, :job_id, :year, :position, :_destroy],
      talent_second_job_attributes: [ :id, :job_id ]
    )
  end
end








