class HeadhuntersController < ApplicationController


  def repertory
    @talents = Talent.all.order(updated_at: :desc)
    authorize @talent
  end

  def show
    @headhunter = Headhunter.find(params[:id])
    authorize @headhunter
  end
end
