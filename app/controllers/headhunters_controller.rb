class HeadhuntersController < ApplicationController


  def repertory
    @headhunter = current_headhunter
    authorize @headhunter
    if params[:tag].blank?
      @talents = Talent.all.order(updated_at: :desc)
    else
      # les talents dont le job est : params[:tag]
      @talents = Talent.all.order(updated_at: :desc)
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





