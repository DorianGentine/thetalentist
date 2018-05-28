class PagesController < ApplicationController

# skip_before_action :authenticate_user!, only: :home

  def home
    raise
    @talent = Talent.all
  end

end
