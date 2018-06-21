class HeadhuntersController < ApplicationController

  def repertory
    @headhunter = current_headhunter
    authorize @headhunter

    @relationship = Relationship.new
    @job_alert = JobAlerte.new

    if params[:tag].blank? || params[:tag] == "Tous"
      talents = Talent.where(:visible => true).order(updated_at: :desc)
      @talents = []
      talents.each do |talent|
        if !@headhunter.is_connected_to?(talent)
          @talents << talent
        end
      end
    else
      @talents = []
      # les talents dont le job est : params[:tag]
      talent_jobs = TalentJob.joins(:job, :talent).where(:jobs => {:title => params[:tag]}, :talents => {:visible => true})
      talent_jobs.each do |job|
        talent = Talent.find(job.talent_id)
        if !@headhunter.is_connected_to?(talent)
          @talents << talent
        end
      end
    end
    @titre = "Tous"
    if params[:tag] == "Data"
      @titre = "DATA"
    elsif params[:tag] == "Sales"
      @titre = "SALES"
    elsif params[:tag] == "Market"
      @titre = "MARKET"
    elsif params[:tag] == "Product"
      @titre = "PRODUCT"
    elsif params[:tag] == "Tous"
      @titre = "Tous"
    end
  end

  def index
    @talentist = current_talentist
    @headhunters = Headhunter.all

    @startups = Startup.all

    @headhunters = policy_scope(Headhunter)

    if params[:tag].blank?
      @headhunters = Headhunter.all.order(name: :asc)
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
    @startup.pictures.build
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
    @headhunter = Headhunter.find(params[:id])
    if params[:commit] == "Accepter"
      if @headhunter.validated == true
        validated_action(nil)
      elsif @headhunter.validated == false
        validated_action(true)
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





