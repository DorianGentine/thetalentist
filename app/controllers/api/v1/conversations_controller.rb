class Api::V1::ConversationsController < Api::V1::BaseController
  # before_action :autorize_call, only: [ :show]
  # before_action :get_mailbox
  # before_action :get_conversation, except: [:index]


  def index
    conversations = policy_scope(Mailboxer::Conversation)
    user = current_user
    if current_user.is_a?(Talentist)
      if params[:talent_id].present?
        user = Talent.find(params[:talent_id])
      elsif params[:headhunter_id].present?
        user = Headhunter.find(params[:headhunter_id])
      end
      conversations = user.mailbox.conversations
    end
    p "LES CONVS SONT: #{conversations}"
    @conversations = InboxFormat.new.discussions(conversations, user)
  end

  def show
    @conv =  Mailboxer::Conversation.find(params[:id])
    user = current_user
    if current_user.is_a?(Talentist)
      if params[:talent_id].present?
        user = Talent.find(params[:talent_id])
      elsif params[:headhunter_id].present?
        user = Headhunter.find(params[:headhunter_id])
      end
    end
    @conversation = InboxFormat.new.discussion(user, @conv)
    authorize @conv
  end

  # private

  #   # def get_conversation
  #   #   @conversation ||= @mailbox.conversations.find(params[:id])
  #   # end

  #   def get_mailbox
  #     @mailbox ||= current_user.mailbox
  #   end


  #   def autorize_call
  #     @user = current_talentist if current_talentist
  #     @user = current_talent if current_talent
  #     @user = current_headhunter if current_headhunter
  #     authorize @user
  #   end
end
