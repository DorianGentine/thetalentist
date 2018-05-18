class TalentsController < ApplicationController

  def index
    @talents = Talent.all
  end
  # def show
  #   @talent = Talent.find(session[:talent_id])
  # end
end
