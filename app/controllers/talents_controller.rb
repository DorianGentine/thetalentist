class TalentsController < ApplicationController
  before_action :set_talent, only: [ :show, :edit,
    :update_experience, :update_next_aventure, :update_formation_and_skill,
    :update, :validation, :visible, :info_pdf, :update_photo ]

  def index
    # Delete after action
    # Talent.all.each do |talent|
    #   zip_code = Geocoder.search([talent.latitude, talent.longitude]).first.postal_code
    #   if zip_code.nil?
    #     city = Geocoder.search([talent.latitude, talent.longitude]).first.city
    #     zip_code = 75002 if city.downcase == "paris" || city == "Paris, France" || city == "Paris Area, France, FR" || city == "France, FR"
    #     zip_code = 75002 if city.downcase == "paris" || city == "Zayed City" ||
    #   end
    #   raise if zip_code.nil?
    #   talent.update_attributes(zip_code: zip_code)
    #   p "le talent #{talent.id} a été updated with #{talent.zip_code} from #{talent.city_changed?}"
    # end


    @talentist = current_talentist
    @formations = Formation.missing_type_with_talent
    talents = policy_scope(Talent)
    if params[:tag] == "Valider"
      @talents = talents.where(:validated => true)
    elsif params[:tag] == "Refuser"
      @talents = talents.where(:validated => false)
    elsif params[:tag] == "En attende"
      @talents = talents.where(:validated => nil)
    elsif params[:tag] == "Visible"
      @talents = talents.where(:visible => true)
    elsif params[:tag] == "Invisible"
      @talents = talents.where(:visible => false)
    else
      @talents = talents
    end
  end

  def repertory
    @talent = current_talent
    relationships = Relationship.where(talent_id: current_user.id).where(status: "Accepter")
    @headhunters = []
    relationships.each do |relationship|
      @headhunters << Headhunter.find(relationship.headhunter_id)
    end
    authorize @talent
  end

  def show
    @flats = []
    @flats << @talent
    @flats << @talent
    @markers = @flats.map do |flat|
      { lat: @talent.latitude, lng: @talent.longitude }
    end
    @experiences = @talent.experiences
    @next_aventures = @talent.next_aventures.first
    @talent_formations = @talent.talent_formations.order(:year)
    if @talent.next_aventures.first.present?
      @sectors = @talent.next_aventures.first.next_aventure_sectors
    end
    @credentials = @talent.credentials
  end

  def edit
    @talent.set_build_belong_tables
    if @talent.next_aventures.first.mobilities.count > 0
      1.times {  @talent.next_aventures.first.mobilities.build }
    else
      0.times {  @talent.next_aventures.first.mobilities.build }
    end
    @choices = ["Ambiance", "International", "Produit", "Rémunération", "Sens", "Valeurs", "Mission", "Management", "Worklife balance", "Impact"]
  end


  def update
    if @talent.update_attributes(talent_params)
       redirect_to edit_talent_path(@talent)
    else
      render :edit
    end
  end

  def update_formation_and_skill
    set_new_technos(@talent)
    if @talent.update_attributes(formation_and_skill_params)
      redirect_to edit_talent_path(@talent)
    else
      render :edit
    end
  end

  def update_experience
    if @talent.update_attributes(experience_params)
      @talent.experiences.each do |experience|
        set_new_startups(experience.company_name) if startup_is_available?(experience.company_name)
      end
      redirect_to edit_talent_path(@talent)
    else
      render :edit
    end
  end

  def update_next_aventure
    if @talent.update_attributes(next_aventure_params)
      redirect_to edit_talent_path(@talent)
    else
      render :edit
    end
  end

  def validation
    @talentist = current_talentist
    if params[:commit] == "Accepter" && !@talent.validated
      @talent.validated_action(true)
      @talent.set_conversation_between(@talentist)
    elsif params[:commit] == "Refuser"
      if @talent.validated || @talent.validated.nil?
        @talent.update(declined_params)
        @talent.validated_action(false)
        @talent.send_refused
      end
    end
    @talent.visible_action(false)
    redirect_to talents_path
  end

  def visible
    if params[:commit] == "Invisible" || !@talent.jobs.present?
      @talent.visible_action(false)
    elsif params[:commit] == "Visible"
      if !@talent.visible
        @talent.visible_action(true)
        @talent.alerte_headhunters
      end
    end
    redirect_to talents_path
  end

private

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

  def set_new_technos(talent)
    techno_params = params[:talent][:techno_ids]
    techno_ids = create_new_data_with_only_title(techno_params, "techno")
    talent.techno_ids = techno_ids
  end

  def reminde_new_talents_less_than(created, number)
    talents = Talent.where('created_at <= ?', created).completed_less_than(number).have_been_never_reminded
    talents.each do |talent|
      TalentMailer.reminder_completed(talent.id).deliver_later
      talent.reminder = DateTime.now
      talent.save
    end
  end

  def set_talent
    @talent = Talent.find(params[:id])
    authorize @talent
  end
  def declined_params
    params.require(:talent).permit(:declined)
  end

  def talent_params
    params.require(:talent).permit(
      :name,
      :firstname,
      :phone,
      :linkedin,
      :city,
      :job_ids,
      :btoc,
      :btob,
      :photo,
      :photo_cache,
      :remove_photo,
      :terms_of_condition,
      :no_more,
      :sector_ids,
      :display_linkedin_picture,
      talent_job_attributes: [:id, :job_id, :year, :_destroy],
      talent_second_job_attributes: [:id, :job_id, :_destroy],
      skill_ids: []
    )
  end
  def formation_and_skill_params
    params.require(:talent).permit(
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :type_of_formation, :_destroy],
      talent_languages_attributes: [ :id, :level, :language_id]
    )
  end
  def experience_params
    params.require(:talent).permit(
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy]
    )
  end

  def next_aventure_params
    params.require(:talent).permit(
      next_aventures_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), sector_ids: [], mobilities_attributes:[ Mobility.attribute_names.map(&:to_sym).push(:_destroy)]],
      your_small_plus_attributes: [:id, :description, :_destroy]
    )
  end
end


