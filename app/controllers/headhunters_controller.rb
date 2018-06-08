class HeadhuntersController < ApplicationController


  def repertory
    @headhunter = current_headhunter
    @talents = Talent.all.order(updated_at: :desc)
    authorize @headhunter
  end

  def show
    @headhunter = Headhunter.find(params[:id])
    authorize @headhunter
  end

private
  def params_job

  end
end





