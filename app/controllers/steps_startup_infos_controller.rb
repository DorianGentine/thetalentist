class StepsStartupInfosController < ApplicationController
  include Wicked::Wizard
  steps :startup

  before_action :find_headhunter, only: [:show, :update]
  skip_after_action :verify_authorized
  skip_before_action :authenticate!
  skip_before_action :current_user


  def show
    p "ok je suis dans step pour créer une startup"
    @startup = @headhunter.startup
    render_wizard
  end

  def update
    @startup = @headhunter.startup
    set_new_words(@startup)
    @talentist = Talentist.last
    message = "Bonjour #{@headhunter.firstname}, bienvenue sur notre plateforme ! Nous allons vous contacter au plus vite pour vous confirmer l'utilisation de cette plateforme"
    if @startup.save
      @headhunter.update(startup_id: @startup.id)
      Talentist.last.send_message(@headhunter, message, "#{@headhunter.id}")
      @headhunter.send_welcome_email
      render_wizard @headhunter
    else
      render "steps_startup_infos/#{step}"
    end
  end

private


  def find_headhunter
    if session[:headhunter_id]
      @headhunter = Headhunter.find(session[:headhunter_id])
    else
      @headhunter = current_headhunter
    end
  end

  def finish_wizard_path
    sign_in(@headhunter)
    headhunter_path(@headhunter)
  end

  def set_new_words(startup)
    word_params = params.require(:startup).permit(word_ids: [])[:word_ids]
    word_ids = create_new_data_with_only_title(word_params, "word")
    startup.word_ids = word_ids
  end

  def startup_params
    params.require(:startup).permit(
      :name,
      :year_of_creation,
      :short_resume,
      :collaborators,
      :average_age,
      :link,
      :address,
      :btoc,
      :btob,
      :overview,
      :mission,
      :linkedin,
      :terms_of_condition,
      :sector_ids
      )
  end

end
