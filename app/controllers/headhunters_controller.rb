class HeadhuntersController < ApplicationController

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
    @headhunter = Headhunter.find(params[:id])
    @startup = @headhunter.startup

    if @startup.pictures.count == 0
      1.times { @startup.pictures.build }
    else
      0.times { @startup.pictures.build }
    end


    authorize @headhunter

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
    @headhunter = Headhunter.find(params[:id])
    if @headhunter.update_attributes(startup_params)
      if params[:headhunter][:job_ids].present?
        redirect_to repertoire_path
      else
        redirect_to headhunter_path(@headhunter)
      end
    end
    authorize @headhunter
  end

  def to_validate
    @talentist = Talentist.find_by_email("dimitri@hotmail.fr")
    @headhunter = Headhunter.find(params[:id])
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
    authorize @headhunter
  end

  private

  def validated_action(action)
    @headhunter.validated = action
    @headhunter.save
  end

  def startup_params
    params.require(:headhunter).permit(
      startup_attributes: [ :id, :name, :link, :logo, :address, :sector_ids, :btob, :btoc, :validated,
      :average_age, :collaborators, :year_of_creation, :overview ],
      word: [],
      job_ids: []
      )
  end
end





