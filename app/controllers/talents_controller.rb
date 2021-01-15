class TalentsController < ApplicationController
  before_action :set_talent, only: [ :show, :edit,
    :update_experience, :update_next_aventure, :update_formation_and_skill,
    :update, :validation, :visible, :info_pdf, :update_photo, :refused ]

  def index
    @talentist = current_talentist
    @formations = Formation.missing_type_with_talent
    talents = policy_scope(Talent).where(validated: [true, nil])
    if params[:tag] == "Valider"
      @talents = talents.where(:validated => true)
    elsif params[:tag] == "Refuser"
      @talents = policy_scope(Talent).where(:validated => false)
    elsif params[:tag] == "En attende"
      @talents = talents.where(:validated => nil)
    elsif params[:tag] == "Visible"
      @talents = talents.where(:visible => true)
    elsif params[:tag] == "Invisible"
      @talents = talents.where(:visible => false)
    else
      @talents = talents
    end

    @notifications = Notification.all
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

  def validation
    @talentist = current_talentist
    if params[:commit] == "Accepter" && !@talent.validated
      @talent.validated_action(true)
      @talent.set_conversation_between(@talentist)
    end
    @talent.visible_action(false)
    redirect_to talents_path
  end

  def refused
    @talentist = current_talentist
    @talent.declined = params[:talent][:declined]
    @talent.validated = false
    if @talent.save
      @talent.send_refused
    end
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

  def info_pdf
    @talent = TalentPresenter.new(@talent)

    pdf_html = render_to_string(
      template: 'talents/pdf_recommendation.html.erb',
      layout: 'pdf.html.erb'
    )
    pdf = WickedPdf.new.pdf_from_string(pdf_html, pdf: 'Recommandation de talents', page_width: 210, page_height: 210)
    send_data(pdf, filename: 'file.pdf')

    # @talent = TalentPresenter.new(@talent)
    # respond_to do |format|
    #   format.pdf do
    #     render(
    #       pdf: 'Recommandation de talents',
    #       disposition: 'attachment',
    #       template: 'talents/pdf_recommendation.html.erb',
    #       layout: 'pdf.html.erb',
    #       page_width: 210,
    #       page_height: 210
    #     )
    #   end
    # end
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

  def set_new_skills(talent)
    skill_params = params[:talent][:skill_ids]
    skill_ids = create_new_data_with_only_title(skill_params, "skill")
    talent.skill_ids = skill_ids
  end

  def set_new_knowns(talent)
    known_params = params[:talent][:known_ids]
    known_ids = create_new_data_with_only_title(known_params, "known")
    talent.known_ids = known_ids
  end

  def set_new_technos(talent)
    techno_params = params[:talent][:techno_ids]
    techno_ids = create_new_data_with_only_title(techno_params, "techno")
    talent.techno_ids = techno_ids
  end

  def remind_new_talents_less_than(created, number)
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
      :last_name,
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
      next_aventure_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), sector_ids: [], mobilities_attributes:[ Mobility.attribute_names.map(&:to_sym).push(:_destroy)]],
      your_small_plus_attributes: [:id, :description, :_destroy]
    )
  end
end


