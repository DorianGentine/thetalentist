class PagesController < ApplicationController

skip_before_action :authenticate_headhunter!, only: :home

def home
  @talent = Talent.all
end

end
