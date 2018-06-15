class HeadhuntersController < ApplicationController

  def repertory
    @headhunter = current_headhunter
    authorize @headhunter
    if params[:tag].blank?
      @talents = Talent.all.order(updated_at: :desc)
    else
      @talents = []
      # les talents dont le job est : params[:tag]
      talent_jobs = TalentJob.joins(:job).where(:jobs => {:title => params[:tag]})
      talent_jobs.each do |job|
        @talents << Talent.find(job.talent_id)
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

  private
  def params_job

  end
end





