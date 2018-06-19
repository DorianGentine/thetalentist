class StepsStartupInfosController < ApplicationController
  include Wicked::Wizard
  steps :startup

  before_action :find_headhunter, only: [:show, :update]
  # skip_before_action :authenticate!
  # skip_before_action :current_user


  def show
    @startup = Startup.new
    render_wizard
  end

  def update
    @startup = Startup.new(startup_params)
    @startup.save
    if @headhunter.update(startup_id: @startup.id)
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

  def finish_wizard_path
    sign_in(@headhunter)
    repertoire_path(@headhunter)
  end

  def startup_params
    params.require(:startup).permit(
      :name,
      :year_of_creation,
      :collaborators,
      :parity,
      :average_age,
      :turnover,
      :link,
      :address
      )

  end

end
