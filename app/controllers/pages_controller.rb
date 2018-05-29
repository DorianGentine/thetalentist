class PagesController < ApplicationController

  skip_before_action :authenticate!, only: [ :home ]
  skip_before_action :current_user, only: [ :home ]

  def home
    @talent = Talent.all
  end

end
