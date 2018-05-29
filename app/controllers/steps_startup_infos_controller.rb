class StepsStartupInfosController < ApplicationController
  include Wicked::Wizard
  steps :startup

  before_action :find_headhunter, only: [:show, :update]
  skip_before_action :authenticate!
  skip_before_action :current_user


  def show
    @startup = Startup.new
    render_wizard
  end

  def update
    @startup = Startup.new(startup_params)
    @startup.save
    @headhunter.startup << @startup.id
    if @headhunter.update
      render_wizard @headhunter
    else
      render "steps_startup_infos/#{step}"
    end
  end

private

  def find_headhunter
    @headhunter = Headhunter.find(session[:headhunter_id])
    authorize @headhunter
  end

  def startup_params
    params.require(:startup).permit()

  end

end
