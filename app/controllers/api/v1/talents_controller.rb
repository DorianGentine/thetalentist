class Api::V1::TalentsController < Api::V1::BaseController
  before_action :autorize_call, only: [:repertoire, :analytics]
  # before_action :autorize_call, only: [:repertoire, :analytics, :show]

  def repertoire
    talents = Talent.where(:visible => true).reorder(completing: :desc, last_sign_in_at: :desc)
    @talents = TalentFormat.new(talents).for_repository
    # @talents = TalentFormat.new.for_repository(talents)
  end

  def analytics
  end

  # def index
  #   @talents = policy_scope(Talent)
  # end

  # def show
  #   talent = Talent.find(params[:id])
  #   @talent = TalentFormat.new.talent(talent)
  # end

  private

    def autorize_call
      user = current_talentist if current_talentist
      user = current_talent if current_talent
      user = current_headhunter if current_headhunter
      authorize user
    end
end
