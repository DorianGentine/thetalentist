class MessagesController < ApplicationController
  before_action :set_conversation

  def create
    @user = current_user
    if params[:mailboxer_message][:body].present?
      @receipt = @user.reply_to_conversation(
        @conversation,
        params[:mailboxer_message][:body],
        nil,
        true,
        true,
        params[:mailboxer_message][:attachment]
        )
      # pour récupérer le fichier attaché :
      # receipt.message.attachment.url --> "http://res.cloudinary.com/da4nnrzbu/image/upload/v1528733299/jhwimkdrds6gs4pxhvyw.jpg"
      participant = @conversation.participants - [current_user]
      @participant = participant[0]

      # send email only for new messages but not for the first one beacause it will be welcome_in_our_plateforme
      if Mailboxer::Conversation.participant(@participant).count > 0
        @user.new_message(@receipt, @participant)
      end
      redirect_to conversation_path(@receipt.conversation)
    else
      flash[:notice] = "Attention, vous n'avez pas de text"
      redirect_to conversation_path(@conversation)
    end
    authorize @conversation
  end

  private

  def set_conversation
    @conversation = current_user.mailbox.conversations.find(params[:conversation_id])
  end
end
