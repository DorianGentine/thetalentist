class TalentsController < ApplicationController

  def index
    @talents = Talent.all
  end
  def show
    @talent = Talent.find(params[:id])
  end

end
