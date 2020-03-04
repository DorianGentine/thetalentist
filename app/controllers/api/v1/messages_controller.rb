class Api::V1::MessagesController < ApplicationController
  before_action :set_conversation
  skip_before_action :verify_authenticity_token

  def create
    p "IN CREATED MESSAGe"
    @user = current_user
    if params[:body].present?
      @receipt = @user.reply_to_conversation(
        @conversation,
        params[:body],
        nil,
        true,
        true,
        params[:attachment]
        )
      # pour récupérer le fichier attaché :
      # receipt.message.attachment.url --> "http://res.cloudinary.com/da4nnrzbu/image/upload/v1528733299/jhwimkdrds6gs4pxhvyw.jpg"
      participant = @conversation.participants - [current_user]
      @participant = participant[0]

      # send email only for new messages but not for the first one beacause it will be welcome_in_our_plateforme
      if Mailboxer::Conversation.participant(@participant).count > 0
        @user.new_message(@receipt, @participant)
      end
      head :no_content
    end
    authorize @user
  end

  private

  def set_conversation
    @conversation = current_user.mailbox.conversations.find(params[:conversation_id])
  end
end
