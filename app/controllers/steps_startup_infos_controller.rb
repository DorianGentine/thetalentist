class StepsStartupInfosController < ApplicationController
  include Wicked::Wizard
  steps :startup

  before_action :find_headhunter, only: [:show, :update]
  skip_after_action :verify_authorized
  skip_before_action :authenticate!
  skip_before_action :current_user


  def show
    @startup = Startup.new
    render_wizard
  end

  def update
    @startup = Startup.new(startup_params)
    @talentist = Talentist.last
    message = "Bonjour #{@headhunter.firstname}, Bienvenue sur notre plateforme! Nous allons vous contacter au plus vite pour vous confirmer l'utilisation de cette plateforme"
    if @startup.save
      @headhunter.update(startup_id: @startup.id)
      Talentist.last.send_message(@headhunter, message, "#{@headhunter.id}")
      HeadhunterMailer.accepted(@headhunter).deliver_later
      render_wizard @headhunter
    else
      render "steps_startup_infos/#{step}"
    end
  end

private

  def find_headhunter
    @headhunter = Headhunter.find(session[:headhunter_id])
    # authorize @headhunter
  end

  def finish_wizard_path
    sign_in(@headhunter)
    headhunter_path(@headhunter)
  end

  def startup_params
    params.require(:startup).permit(
      :name,
      :year_of_creation,
      :collaborators,
      :average_age,
      :link,
      :address,
      :terms_of_condition
      )
  end

end
