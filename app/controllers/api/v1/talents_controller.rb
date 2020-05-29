class Api::V1::TalentsController < Api::V1::BaseController
  before_action :autorize_call, only: [:repertoire, :analytics, :show, :sort]

  def repertoire
    talents = Talent.where(:visible => true).reorder(position: :asc, completing: :desc, last_sign_in_at: :desc)
    @talents = TalentFormat.new.for_api_repository(talents, current_headhunter)
    @conversation_id = current_user.mailbox.conversations.first.id
    @user = current_user
    p "TEST => #{current_headhunter}"
  end

  def analytics
  end

  def index
    @talents = policy_scope(Talent)
  end

  def show
    @talent = Talent.find(params[:id])
    @next_aventure = @talent.next_aventure
    @mobilities = @next_aventure.mobilities
    @sector_ids = @next_aventure.sector_ids
    @job = @talent.talent_job
    @second_job = @talent.talent_second_job
    authorize @talent
  end

  def sort
    params[:_json].each_with_index do |id, index|
      Talent.where(id: id).update_all(position: index + 1)
    end
    head :ok
  end

  def update
    @talent = Talent.find(params[:id])
    if @talent.update(talent_params)
      render :show
    else
      # rediriger message erreur
    end
    authorize @talent
  end
  
  private
  
  def autorize_call
    p "TOUTES LES INFOS :"
    p "current_talentist: #{current_talentist}"
    p "current_talent: #{current_talent}"
    p "current_headhunter: #{current_headhunter}"
    user = current_talentist if current_talentist
    user = current_talent if current_talent
    user = current_headhunter if current_headhunter
    p "user: #{user}"
      authorize user
    end
    
    def talent_params
      params.require(:talent).permit(
        :firstname,
        :last_name,
        :phone,
        :linkedin,
        :city,
        :btoc,
        :btob,
        :terms_of_condition,
        :no_more,
        :sector_ids,
        hobby_ids: [],
        experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
        next_aventure_attributes:[ NextAventure.attribute_names.map(&:to_sym).push(:_destroy), sector_ids: [], mobilities_attributes:[ Mobility.attribute_names.map(&:to_sym).push(:_destroy)]],
        talent_formations_attributes: [ :id, :title, :year, :formation_id, :_destroy],
        talent_languages_attributes: [ :id, :level, :language_id, :_destroy],
        your_small_plus_attributes: [:id, :description, :_destroy],
        talent_job_attributes: [:id, :job_id, :year, :position, :_destroy],
        talent_second_job_attributes: [ :id, :job_id ]
      )
    end
end
