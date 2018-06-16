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

  def show
    @headhunter = Headhunter.find(params[:id])
    authorize @headhunter
  end

  def update
    raise
  end

  private
  def params_job

  end
end





