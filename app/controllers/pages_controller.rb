class PagesController < ApplicationController

def home
  @talent = Talent.all
end

end
