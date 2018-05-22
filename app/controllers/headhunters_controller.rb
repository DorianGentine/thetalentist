class HeadhuntersController < ApplicationController


  def repertory
    @talents = Talent.all
  end
  def show
    @headhunter = Headhunter.find(params[:id])
  end

end
