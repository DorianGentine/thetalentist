class Api::V1::ConfigConversationsController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for Talentist, fallback_to_devise: false
  # before_action :require_authentication! # eventually scoped to only: :restricted_action

  def update
    @config_conversations = ConfigConversation.find(params[:id])
    # authorize @config_conversations
     if @config_conversations.update(config_conversation_params)
      render :update
    else
      render_error
    end
  end

  # ...

  private
    def require_authentication!
      throw(:warden, scope: :talentist) unless current_user.presence
    end


  def config_conversation_params
    params.require(:config_conversation).permit(:pin, :archived)
  end

end
