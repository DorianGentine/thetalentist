class HeadhuntersController < ApplicationController
  before_action :set_headhunter, only: [
    :show, :to_validate, :update,
    :update_profile, :update_startup, :update_photos, :edit
  ]
  def repertory
    @headhunter = current_headhunter
    authorize @headhunter

    @relationship = Relationship.new
    @job_alert = JobAlerte.new

    @jobs = Job.all
    talents_visible = Talent.where(:visible => true).order(updated_at: :desc)
    if params[:jobs].blank? || params[:jobs] == "Tous"
      talents = talents_visible
    else
      talents = talents_visible.his_job_is(params[:jobs]).to_a
      respond_to do |format|
        format.html
        format.js
      end
    end

    @talents = []
    talents.each do |talent|

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
        talent.next_aventures.last.sectors.each do |talent_sector|
          sector_injected = {
            title: talent_sector.present? ? talent_sector.title : nil,
          }
          talent_sectors << sector_injected
        end
      end

      talent_experiences = []
      talent.experiences.reverse_each do |experience|
        experience_injected = {
          position: experience.position.present? ? experience.position : false,
          company_type: experience.company_type.present? ? experience.company_type.title : false,
          starting: experience.starting.present? ? experience.starting : false,
          currently: experience.currently ? "Aujourd'hui" : false,
          years: experience.years.present? ? experience.years : false,
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
        position: talent.experiences.last.present? ? talent.experiences.last.position : nil,
        year_experience_job: talent.talent_jobs.last.present? ? talent.talent_jobs.last.year : "0",
        city: talent.city,
        job: talent.jobs.first.present? ? talent.jobs.first.title : nil,
        overview: talent.overview,
        update: talent.updated_at,
        next_aventure: {
          famous_person: talent.next_aventures.count > 0 && talent.next_aventures.last.famous_person.present? ? talent.next_aventures.last.famous_person : "Le talent n'a pas souhaité répondre à cette question.",
          work_for_free: talent.next_aventures.count > 0 && talent.next_aventures.last.work_for_free.present? ? talent.next_aventures.last.work_for_free : "Le talent n'a pas souhaité répondre à cette question.",
          btob: talent.next_aventures.count > 0 && talent.next_aventures.last.btob.present? ? true : false,
          btoc: talent.next_aventures.count > 0 && talent.next_aventures.last.btoc.present? ? true : false,
        },
        sectors: talent_sectors,
        formations: talent_formations,
        experiences: talent_experiences,
        technos: talent_technos,
        talent_small_plus: your_small_plus,
      }

      @talents << talent_injected
    end

  end

  def destroy
    @headhunter = Headhunter.find(params[:id])
    @headhunter.destroy
    redirect_to headhunters_path
    authorize @headhunter
  end

  def index
    @talentist = current_talentist
    @headhunters = Headhunter.all

    @startups = Startup.all

    if !@headhunters = policy_scope(Headhunter)
      if current_user.is_a?(Talent)
        redirect_to talent_path(current_user)
      elsif current_user.is_a?(Headhunter)
        redirect_to headhunter_path(current_user)
      else
        redirect_to root_path
      end
    end

    if params[:tag].blank?
      @headhunters = Headhunter.all.order('created_at DESC')
      @titre = "Tous"
    else
      # les headhunters dont le job est : params[:tag]
      if params[:tag] == "Tous"
        @headhunters = Headhunter.all.order('created_at DESC')
        @titre = "Tous"
      elsif params[:tag] == "Valider"
        @headhunters = Headhunter.where(:validated => true).order('created_at DESC')
        @titre = "Valider"
      elsif params[:tag] == "Refuser"
        @headhunters = Headhunter.where(:validated => false).order('created_at DESC')
        @titre = "Refuser"
      else params[:tag] == "En attende"
        @headhunters = Headhunter.where(:validated => nil).order('created_at DESC')
        @titre = "En attente"
      end
    end
  end


  def show
    @startup = @headhunter.startup
    # a changer!! TODO
    # @flats = Startup.where.not(latitude: nil, longitude: nil)
    @flats = []
    @flats << @startup
    @flats << @startup
    @markers = @flats.map do |flat|
      {
        lat: @startup.latitude,
        lng: @startup.longitude
      #,
      # infoWindow: { content: render_to_string(partial: "/flats/map_box", locals: { flat: flat }) }
      }
    end
  end

  def update
    if @headhunter.update_attributes(headhunter_params)
      if params[:headhunter][:job_ids].present?
        redirect_to repertoire_path
      else
        redirect_to headhunter_path(@headhunter)
      end
    end
  end

  def edit
    @startup = @headhunter.startup

    # Add 5 fiels for pictures
    count_picture = @startup.pictures.count
    for i in count_picture..4 do
      @startup.pictures.build
    end
    # raise
    if current_user.is_a? Headhunter
      @other_headhunters = @startup.headhunters - [@headhunter]
    else
      @other_headhunters = @startup.headhunters
    end
    @startup.startup_words.build
  end

  def update_profile
    @startup = @headhunter.startup
    @other_headhunters = @startup.headhunters - [@headhunter]
    update_edit(@headhunter, headhunter_params)
  end

  def update_photos
    @startup = @headhunter.startup
    update_edit_startup(@startup, startup_params, @headhunter)
  end

  def update_startup
    @startup = @headhunter.startup
    set_new_words(@startup)
    update_edit(@headhunter, headhunter_params)

    # update_edit_startup(@startup, startup_params, @headhunter)
  end

  def to_validate
    @talentist = current_talentist
    if params[:commit] == "Accepter"
      if @headhunter.validated == true
        validated_action(nil)
      else # @headhunter.validated == false
        validated_action(true)
        # find the conversation between two user
        conversations = Mailboxer::Conversation.participant(@talentist).participant(@headhunter)
        if conversations.size > 0
          @talentist.reply_to_conversation(conversations.first, "Ravi de te revoir sur notre plateforme #{@headhunter.firstname}! N'hésite pas si tu as des questions", nil, true, true, nil)
        else
          @talentist.send_message(@headhunter, "Bonjour #{@headhunter.firstname}, bienvenue sur notre plateforme !", "#{@headhunter.id}")
          HeadhunterMailer.accepted(@headhunter.id).deliver_later
        end
      # else @headhunter.validated == nil
      #   validated_action(true)
      end
    else params[:commit] == "Refuser"
      if @headhunter.validated == false
        validated_action(nil)
      elsif @headhunter.validated == true
        validated_action(false)
      else @headhunter.validated == nil
        validated_action(false)
      end
    end
    redirect_to headhunters_path

  end

  private

  def set_new_words(startup)
    word_params = params.require(:headhunter).permit(startup_attributes:[word_ids:[]])[:startup_attributes][:word_ids]
    word_ids = create_new_data_with_only_title(word_params, "word")
    startup.word_ids = word_ids
  end

  def update_edit(headhunter, headhunter_params)
    if headhunter.update_attributes(headhunter_params)
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js  # <-- idem
      end
    end
  end

  def update_edit_startup(startup, startup_params, headhunter)
    if startup.update_attributes(startup_params)
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js  # <-- idem
      end
    end
  end

  def set_headhunter
    @headhunter = Headhunter.find(params[:id])
    authorize @headhunter
  end

  def validated_action(action)
    @headhunter.validated = action
    @headhunter.save
  end

  def headhunter_params
    params.require(:headhunter).permit(
      :photo, :remove_photo, :name, :firstname, :job,
      startup_attributes: [ :id, :name, :link, :logo, :remove_logo, :address, :mission,
      :sector_ids, :btob, :btoc, :validated, :short_resume, :linkedin, :facebook,
      :average_age, :collaborators, :year_of_creation, :overview,
      pictures_attributes: [ :id, :photo, :photo_cache, :remove_photo, :_destroy],
      # startup_words_attributes: [ :id, :word_id, :_destroy]],
      ],
      word: [],
      job_ids: []
      )
  end
  def startup_params
    params.require(:startup).permit(
      :name, :link, :logo, :address,
      :sector_ids, :btob, :btoc, :validated, :short_resume, :mission, :linkedin, :facebook,
      :average_age, :collaborators, :year_of_creation, :overview,
      pictures_attributes: [ :id, :photo, :photo_cache, :remove_photo, :_destroy],
      # startup_words_attributes: [ :id, :word_id, :_destroy ],
      job_ids: []
      )
  end
end





