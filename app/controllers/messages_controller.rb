class MessagesController < ApplicationController
  before_action :set_conversation

  def create
    receipt = current_user.reply_to_conversation(
      @conversation,
      params[:mailboxer_message][:body],
      nil,
      true,
      true,
      params[:mailboxer_message][:attachment]
      )
    # pour récupérer le fichier attaché :
    # receipt.message.attachment.url --> "http://res.cloudinary.com/da4nnrzbu/image/upload/v1528733299/jhwimkdrds6gs4pxhvyw.jpg"
    redirect_to conversation_path(receipt.conversation)
    authorize @conversation
  end

  private

  def set_conversation
    @conversation = current_user.mailbox.conversations.find(params[:conversation_id])
  end
end
