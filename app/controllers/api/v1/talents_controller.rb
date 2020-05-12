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
    talent = Talent.find(params[:id])
    @talent = TalentFormat.new.talent(talent)
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
    authorize talent
  end

  private

    def autorize_call
      user = current_talentist if current_talentist
      user = current_talent if current_talent
      user = current_user if current_headhunter
      authorize user
    end

    def talent_params
      params.require(:talent).permit(:city)
    end
end
