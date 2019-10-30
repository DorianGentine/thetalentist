class Api::V1::TalentsController < Api::V1::BaseController
  before_action :autorize_call, only: [:repertoire]

  def repertoire
    talents = Talent.where(:visible => true).reorder(completing: :desc, last_sign_in_at: :desc)
    @talents = TalentFormat.new(talents).for_repository.first(20)
  end

  private

    def autorize_call
      user = current_talentist if current_talentist
      user = current_talent if current_talent
      user = current_headhunter if current_headhunter
      authorize user
    end
end
