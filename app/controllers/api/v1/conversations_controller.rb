class Api::V1::ConversationsController < Api::V1::BaseController
  before_action :autorize_call, only: [ :all ]

  def all
    @conversations = Mailboxer::Conversation.all
  end

  private

    def autorize_call
      user = current_talentist if current_talentist
      user = current_talent if current_talent
      user = current_headhunter if current_headhunter
      authorize user
    end
end
