class Api::V1::ConfigConversationsController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for Talentist, fallback_to_devise: false
  # before_action :require_authentication! # eventually scoped to only: :restricted_action

  def update
    @config_conversation = ConfigConversation.find(params[:id])
    authorize @config_conversation
     if @config_conversation.update(config_conversation_params)
      @conversation = Mailboxer::Conversation.find(@config_conversation.conversation_id)
      if params[:files].present?
        @receipt = current_user.reply_to_conversation(
          @conversation,
          @config_conversation.files.last.key
        )
      end
      user = current_user
      @conversation = InboxFormat.new.discussion(user, @conversation)
      conversations = policy_scope(Mailboxer::Conversation)
      @conversations = InboxFormat.new.discussions(conversations, user)
      render :update
    else
      render_error
    end
  end

  private

    def require_authentication!
      throw(:warden, scope: :talentist) unless current_user.presence
    end


    def config_conversation_params
      params.permit(
        :pin, 
        :archived, 
        :files, 
        :note
      )
    end

end
