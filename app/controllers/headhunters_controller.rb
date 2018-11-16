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

    if params[:jobs].blank? || params[:jobs] == "Tous"
      @talents = Talent.where(:visible => true).order(updated_at: :desc)
    else
      @talents = []
      talent_jobs = TalentJob.joins(:job, :talent).where(:jobs => {:title => params[:jobs]}, :talents => {:visible => true})

      talent_jobs.each do |job|
        talent = Talent.find(job.talent_id)
        # if !@headhunter.is_connected_to?(talent)
          @talents << talent
          respond_to do |format|
            format.html
            format.js
          end
        # end
      end
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
      @headhunters = Headhunter.all.order(name: :asc)
      @titre = "Tous"
    else
      # les headhunters dont le job est : params[:tag]
      if params[:tag] == "Tous"
        @headhunters = Headhunter.all
        @titre = "Tous"
      elsif params[:tag] == "Valider"
        @headhunters = Headhunter.where(:validated => true)
        @titre = "Valider"
      elsif params[:tag] == "Refuser"
        @headhunters = Headhunter.where(:validated => false)
        @titre = "Refuser"
      else params[:tag] == "En attende"
        @headhunters = Headhunter.where(:validated => nil)
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
    @other_headhunters = @startup.headhunters - [@headhunter]
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
    update_edit(@headhunter, headhunter_params)
    # update_edit_startup(@startup, startup_params, @headhunter)
  end

  def to_validate
    @talentist = current_talentist
    if params[:commit] == "Accepter"
      if @headhunter.validated == true
        validated_action(nil)
      elsif @headhunter.validated == false
        validated_action(true)
        # find the conversation between two user
        conversations = Mailboxer::Conversation.participant(@talentist).participant(@headhunter)
        if conversations.size > 0
          @talentist.reply_to_conversation(conversations.first, "Ravi de te revoir sur notre plateforme #{@headhunter.firstname}! N'hésite pas si tu as des questions", nil, true, true, nil)
        else
          # @talentist.send_message(@headhunter, "Bonjour #{@headhunter.firstname}, Bienvenue sur notre plateforme!", "#{@headhunter.id}")
          # HeadhunterMailer.accepted(@headhunter).deliver_now
        end
      else @headhunter.validated == nil
        validated_action(true)
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
      :photo, :name, :firstname, :job,
      startup_attributes: [ :id, :name, :link, :logo, :address, :mission,
      :sector_ids, :btob, :btoc, :validated, :short_resume, :linkedin, :facebook,
      :average_age, :collaborators, :year_of_creation, :overview, word_ids: [],
      pictures_attributes: [ :id, :photo, :_destroy],
      startup_words_attributes: [ :id, :word_id, :_destroy]],
      word: [],
      job_ids: []
      )
  end
  def startup_params
    params.require(:startup).permit(
      :name, :link, :logo, :address,
      :sector_ids, :btob, :btoc, :validated, :short_resume, :mission, :linkedin, :facebook,
      :average_age, :collaborators, :year_of_creation, :overview, word_ids: [],
      pictures_attributes: [ :id, :photo, :_destroy],
      startup_words_attributes: [ :id, :word_id, :_destroy ],
      job_ids: []
      )
  end
end





