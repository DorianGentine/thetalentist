class HeadhuntersController < ApplicationController


  def repertory
    @headhunter = Headhunter.find(session[:headhunter_id])
    @talents = Talent.all.order(updated_at: :desc)
    authorize @headhunter
  end

  def show
    @headhunter = Headhunter.find(params[:id])
    authorize @headhunter
  end
end
