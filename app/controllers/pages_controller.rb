class PagesController < ApplicationController



  skip_before_action :authenticate_talent!, only: :home

  def home
  end
end
