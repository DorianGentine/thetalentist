class Api::V1::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # acts_as_token_authentication_handler_for Talent
  # acts_as_token_authentication_handler_for Talentist
  # acts_as_token_authentication_handler_for Headhunter

  before_action :set_conversation

  def create
    @user = Talent.find_by_email(params[:email]) || Headhunter.find_by_email(params[:email]) || Talentist.find_by_email(params[:email])
    authorize @conversation
    if params[:body].present? || @user.present?
      @receipt = @user.reply_to_conversation(
        @conversation,
        params[:body],
        params[:attachment]
        )
      # pour récupérer le fichier attaché :
      # receipt.message.attachment.url --> "http://res.cloudinary.com/da4nnrzbu/image/upload/v1528733299/jhwimkdrds6gs4pxhvyw.jpg"
      participant = @conversation.participants - [@user]
      @participant = participant[0]

      # send email only for new messages but not for the first one beacause it will be welcome_in_our_plateforme
      if Mailboxer::Conversation.participant(@participant).count > 0
        @user.new_message(@receipt, @participant)
      end
      head :no_content
    else
      render_error
    end
  end

  private

  def set_conversation
    @conversation = Mailboxer::Conversation.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:body, :attachment)
  end

  def render_error
    render json: { errors: @conversation.errors.full_messages },
      status: :unprocessable_entity
  end

end
