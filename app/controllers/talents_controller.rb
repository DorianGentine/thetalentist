class TalentsController < ApplicationController
  before_action :set_talent, only: [ :show, :edit, :update_profile,
    :update_experience, :update_next_aventure, :update_formation_and_skill,
    :update, :to_validate, :info_pdf, :update_photo ]

  def index
    @talentist = current_talentist
    @talents = Talent.all

    if !@talents = policy_scope(Talent)
      if current_user.is_a?(Talent)
        redirect_to talent_path(current_user)
      elsif current_user.is_a?(Headhunter)
        redirect_to headhunter_path(current_user)
      else
        redirect_to root_path
      end
    end

    if params[:tag].blank?
      @talents = Talent.all.order(name: :asc)
      @titre = 'All'
    else
      # les talents dont le job est : params[:tag]
      if params[:tag] == "Tous"
        @talents = Talent.all
        @titre = "Tous"
      elsif params[:tag] == "Valider"
        @talents = Talent.where(:validated => true)
        @titre = "Valider"
      elsif params[:tag] == "Refuser"
        @talents = Talent.where(:validated => false)
        @titre = "Refuser"
      elsif params[:tag] == "En attende"
        @titre = "En attente"
        @talents = Talent.where(:validated => nil)
      elsif params[:tag] == "Visible"
        @talents = Talent.where(:visible => true)
        @titre = "Visible"
      else params[:tag] == "Invisible"
        @talents = Talent.where(:visible => false)
        @titre = "Invisible"
      end
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
    @talents = Talent.all
    @experiences = @talent.experiences.where(currently: true) + @talent.experiences.where.not(currently: true).order('years  ASC')
    @next_aventures = @talent.next_aventures.last

    @talent_formations = @talent.talent_formations.order(:year)
    if @talent.next_aventures.last.present?
      @sectors = @talent.next_aventures.last.next_aventure_sectors
    end
    @credentials = @talent.credentials
  end

  def update
    if talent_params["talent_formations_attributes"]
      talent_params["talent_formations_attributes"].each do |talent_formation|
        if talent_formation[1]["id"]
          t = TalentFormation.find(talent_formation[1]["id"].to_i)
          t.update(title: talent_formation[1]["title"], year: talent_formation[1]["year"], formation_id: talent_formation[1]["formation_id"].to_i)
        end
      end
    end
    @talent.update_password_with_password(talent_password)
    # raise
    # @talent.update_attributes(talent_params)
    redirect_to talent_path(@talent)
  end

  # edit general
  def edit
     if @talent.talent_formations.count == 0
      1.times { @talent.talent_formations.build }
    else
      0.times { @talent.talent_formations.build }
    end
    if @talent.talent_jobs.count == 0
      1.times { @talent.talent_jobs.build }
    else
      0.times { @talent.talent_jobs.build }
    end
    if @talent.talent_languages.count == 0
      1.times { @talent.talent_languages.build }
    else
      0.times { @talent.talent_languages.build }
    end
    if @talent.experiences.count == 0
      1.times { @talent.experiences.build }
    else
      0.times { @talent.experiences.build }
    end
    if @talent.next_aventures.count == 0
      1.times { @talent.next_aventures.build }
    else
      0.times { @talent.next_aventures.build }
    end
    if @talent.your_small_plus.count == 0
      1.times { @talent.your_small_plus.build }
    else
      0.times { @talent.your_small_plus.build }
    end
    @choices = ["Ambiance", "International", "Produit", "Rémunération", "Sens", "Valeurs", "Mission", "Management", "Worklife balance", "Impact"]
  end

  def update_profile
    update_edit(@talent, talent_params)
  end

  def update_formation_and_skill
    # raise
    update_edit(@talent, talent_params)
  end

  def update_experience
    update_edit(@talent, talent_params)
  end

  def update_next_aventure
    update_edit(@talent, talent_params)
  end


  def to_validate
    @talentist = current_talentist
    if params[:commit] == "Accepter"
      if @talent.validated == true
        validated_action(nil)
      elsif @talent.validated == false
        validated_action(true)

        conversations = Mailboxer::Conversation.participant(@talentist).participant(@talent)
        if conversations.size > 0
          @talentist.reply_to_conversation(conversations.first, "Ravi de te revoir sur notre plateforme #{@talent.firstname}! N'hésite pas si tu as des questions", nil, true, true, nil)
        else
          @talentist.send_message(@talent, "Bonjour #{@talent.firstname}, Bienvenue sur notre plateforme!", "#{@talent.id}")
          @talent.send_accepted
        end
      else @talent.validated == nil
        validated_action(true)
      end
    elsif params[:commit] == "Refuser"
      if @talent.validated == false
        validated_action(nil)
      elsif @talent.validated == true
        @talent.update(declined_params)
        @talent.send_refused
        validated_action(false)
        visible_action(false)
      else @talent.validated == nil
        validated_action(false)
        visible_action(false)
      end
    elsif params[:commit] == "Visible"
      if @talent.visible == false || @talent.visible == nil
        visible_action(true)
        # envoyer un message quand un talent passe visible et le job a une alert
        job = @talent.jobs.first.id
        headhunters = []
        job_alertes = JobAlerte.where(job_id: job)
        if job_alertes.count > 0
          job_alertes.each do |job_alerte|
            headhunter = Headhunter.find(job_alerte.headhunter_id)
            HeadhunterMailer.alerte(headhunter).deliver_now
          end
        end
      end
    else params[:commit] == "Invisible"
      if @talent.visible == true || @talent.visible == nil
        visible_action(false)
      end
    end
    redirect_to talents_path
  end

private

  def update_edit(talent, talent_params)
    if talent.update_attributes(talent_params)
      respond_to do |format|
        format.html { redirect_to edit_talent_path(talent) }
        format.js
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_talent_path(talent) }
        format.js  # <-- idem
      end
    end
  end


  def set_talent
    @talent = Talent.find(params[:id])
    authorize @talent
  end
  def declined_params
    params.require(:talent).permit(:declined)
  end

  def visible_action(action)
    @talent.visible = action
    @talent.save
  end

  def validated_action(action)
    @talent.validated = action
    @talent.save
  end

  def talent_password_old
    old = params.require(:talent).permit(:password_old)
    return old[:password_old]
  end

  def talent_password
    params.require(:talent).permit(:password_old, :password, :password_confirmation )
  end

  def talent_params
    # ici tu ajouteras au fur et à mesure les champs du formulaire (toutes étapes confondues)
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
      :terms_of_condition,
      :no_more,
      :sector_ids,
      techno_ids: [],
      hobby_ids: [],
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
      next_aventures_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), :sector_ids],
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :type_of_formation, :_destroy],
      talent_languages_attributes: [ :id, :level, :language_id],
      your_small_plus_attributes: [:id, :description, :_destroy],
      talent_jobs_attributes: [:id, :job_id, :year, :_destroy],
      skill_ids: []
    )
  end

end


