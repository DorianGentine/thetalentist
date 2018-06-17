class HeadhuntersController < ApplicationController

  def repertory
    @headhunter = current_headhunter
    authorize @headhunter


    @job_alert = JobAlerte.new

    if params[:tag].blank?
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

    if params[:tag] == "Data"
      @titre = "DATA"
    elsif params[:tag] == "Sales"
      @titre = "SALES"
    elsif params[:tag] == "Market"
      @titre = "MARKET"
    elsif params[:tag] == "Product"
      @titre = "PRODUCT"
    end
  end

  def index
    @talentist = current_talentist
    @headhunters = Headhunter.all
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
    authorize @headhunter
  end

  def update
    raise
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
  end
end





