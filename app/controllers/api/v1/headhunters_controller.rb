class Api::V1::HeadhuntersController < Api::V1::BaseController

  def index
    @headhunters = policy_scope(Headhunter)
  end

  def conversations
    @unread_messages = current_user.mailbox.inbox(unread: true).count
    @conversations = current_user.mailbox.inbox({page: params[:page], per_page: 10})
    authorize current_user
  end

  def set_conversation
    headhunter = current_user
    talent = Talent.find(params[:id])
    body = params[:body]
    conversation = Mailboxer::Conversation.between(talent, headhunter).last
    headhunter.reply_to_conversation(conversation, body)
  end

  private

    def get_mailbox
      @mailbox ||= current_user.mailbox
    end

end
