class StepsStartupInfosController < ApplicationController
  include Wicked::Wizard
  steps :startup

  before_action :find_headhunter, only: [:show, :update]

  def show
    render_wizard
  end

  def update

  end

private

  def find_headhunter
    @headhunter = Headhunter.find(session[:headhunter_id])
  end


end
