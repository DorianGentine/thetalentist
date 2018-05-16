class HeadhuntersController < ApplicationController


  def repertory
    @talents = Talent.all
  end
end
