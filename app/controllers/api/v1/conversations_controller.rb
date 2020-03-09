class Api::V1::ConversationsController < Api::V1::BaseController
  before_action :autorize_call, only: [ :left]
  # before_action :get_mailbox
  # before_action :get_conversation, except: [:index]

  def all
    @conversations = Mailboxer::Conversation.all
  end


  def index
    # @unread_messages = @mailbox.inbox(unread: true).count
    # @conversations = @mailbox.inbox({page: params[:page], per_page: 10})
    conversations = policy_scope(Mailboxer::Conversation)
    @conversations = InboxFormat.new.discussions(conversations, current_user)
  end

  def left
    @conversations = InboxFormat.new.discussions(conversations, @user)
  end

  def show
    @conv =  Mailboxer::Conversation.find(params[:id])
    @conversation = InboxFormat.new.discussion(current_user, @conv)
    p "/////////// #{@conv}"
    authorize @conv
  end

  private

    def get_conversation
      @conversation ||= @mailbox.conversations.find(params[:id])
    end

    def get_mailbox
      @mailbox ||= current_user.mailbox
    end


    def autorize_call
      @user = current_talentist if current_talentist
      @user = current_talent if current_talent
      @user = current_headhunter if current_headhunter
      authorize @user
    end
end
