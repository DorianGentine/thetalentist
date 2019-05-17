class HeadhuntersController < ApplicationController
  before_action :set_headhunter, only: [
    :show, :to_validate, :update,
    :update_profile, :update_startup, :update_photos, :edit
  ]
  def repertory
    if current_user.is_a?(Talentist)
      @talentist = current_talentist
      @headhunter = nil
      authorize @talentist
    else
      @talentist = nil
      @headhunter = current_headhunter
      authorize @headhunter
    end

    @relationship = Relationship.new
    @job_alert = JobAlerte.new

    @jobs = Job.all
    talents_visible = Talent.where(:visible => true).order(updated_at: :desc)
    # talents_same_startup = @headhunter.present? ? Talent.all_with_startup(@headhunter.startup.name) : []

    # talents_visible = all_talents_visible - talents_same_startup

    if params[:jobs].blank? || params[:jobs] == "Tous"
      talents = talents_visible
    else
      talents = talents_visible.his_job_is(params[:jobs]).to_a
    end

    @talents = TalentFormat.new(talents).for_repository
    respond_to do |format|
      format.html
      format.js
    end
  end

  def destroy
    @headhunter = Headhunter.find(params[:id])
    @headhunter.destroy
    redirect_to headhunters_path
    authorize @headhunter
  end

  def index
    # DO IT TIME delete after
    # Startup.all.each do |startup|
    #   startup.save
    # end

    @talentist = current_talentist
    @startups = Startup.all
    headhunters = policy_scope(Headhunter)
    if params[:tag] == "Valider"
      @headhunters = headhunters.where(:validated => true)
    elsif params[:tag] == "Refuser"
      @headhunters = headhunters.where(:validated => false)
    elsif params[:tag] == "En attende"
      @headhunters = headhunters.where(:validated => nil)
    else
      @headhunters = headhunters
    end
  end


  def show
    @startup = @headhunter.startup
    @flats = []
    @flats << @startup
    @flats << @startup
    @markers = @flats.map do |flat|
      { lat: @startup.latitude, lng: @startup.longitude }
    end
  end

  def update
    if @headhunter.update_attributes(headhunter_params)
      if params[:headhunter][:job_ids].present?
        redirect_to repertoire_path
      else
        redirect_to headhunter_path(@headhunter)
      end
    end
  end

  def edit
    @startup = @headhunter.startup
    # Add 5 fiels for pictures
    count_picture = @startup.pictures.count
    for i in count_picture..4 do
      @startup.pictures.build
    end
    if current_user.is_a? Headhunter
      @other_headhunters = @startup.headhunters - [@headhunter]
    else
      @other_headhunters = @startup.headhunters
    end
    @startup.startup_words.build
  end

  def update_profile
    @startup = @headhunter.startup
    @other_headhunters = @startup.headhunters - [@headhunter]
    update_edit(@headhunter, headhunter_params)
  end

  def update_photos
    @startup = @headhunter.startup
    update_edit_startup(@startup, startup_params, @headhunter)
  end

  def update_startup
    @startup = @headhunter.startup
    set_new_words(@startup)
    update_edit(@headhunter, headhunter_params)
  end

  def to_validate
    @talentist = current_talentist
    if params[:commit] == "Accepter"
      validated_action(true)
      @headhunter.set_conversation_between(@talentist)
    else params[:commit] == "Refuser"
      validated_action(false)
    end
    redirect_to headhunters_path
  end

  private

  def set_new_words(startup)
    word_params = params.require(:headhunter).permit(startup_attributes:[word_ids:[]])[:startup_attributes][:word_ids]
    word_ids = create_new_data_with_only_title(word_params, "word")
    startup.word_ids = word_ids
  end

  def update_edit(headhunter, headhunter_params)
    if headhunter.update_attributes(headhunter_params)
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js  # <-- idem
      end
    end
  end

  def update_edit_startup(startup, startup_params, headhunter)
    if startup.update_attributes(startup_params)
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_headhunter_path(headhunter) }
        format.js  # <-- idem
      end
    end
  end

  def set_headhunter
    @headhunter = Headhunter.find(params[:id])
    authorize @headhunter
  end

  def validated_action(action)
    @headhunter.validated = action
    @headhunter.save
  end

  def headhunter_params
    params.require(:headhunter).permit(
      :photo, :remove_photo, :name, :firstname, :job,
      startup_attributes: [ :id, :name, :link, :logo, :remove_logo, :address, :mission,
      :sector_ids, :btob, :btoc, :validated, :short_resume, :linkedin, :facebook,
      :average_age, :collaborators, :year_of_creation, :overview,
      pictures_attributes: [ :id, :photo, :photo_cache, :remove_photo, :_destroy],
      # startup_words_attributes: [ :id, :word_id, :_destroy]],
      ],
      word: [],
      job_ids: []
      )
  end
  def startup_params
    params.require(:startup).permit(
      :name, :link, :logo, :address,
      :sector_ids, :btob, :btoc, :validated, :short_resume, :mission, :linkedin, :facebook,
      :average_age, :collaborators, :year_of_creation, :overview,
      pictures_attributes: [ :id, :photo, :photo_cache, :remove_photo, :_destroy],
      # startup_words_attributes: [ :id, :word_id, :_destroy ],
      job_ids: []
      )
  end
end





