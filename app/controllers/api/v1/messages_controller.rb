class Api::V1::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # acts_as_token_authentication_handler_for Talent
  # acts_as_token_authentication_handler_for Talentist
  # acts_as_token_authentication_handler_for Headhunter

  before_action :set_conversation

  def create
    @user = sender_authentification
    authorize @conversation
    if params[:in_relation]
      rela = Relationship.where(conversation_id: @conversation.id).first
      rela.status = params[:in_relation]
      rela.save
    end
    if params[:body].present? || @user.present?
    p "Attachment is #{params[:attachment]}"
      @receipt = @user.reply_to_conversation(
        @conversation,
        params[:body],
        params[:attachment]
        )
      p "MESSAGE IS #{@receipt.message.attachment}"

      # document.file = params["attachment"]
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

  def sender_authentification
    p "sender_id is #{params[:sender_id]}"
    p "email is #{params[:email]}"
    user = Talent.where(email: params[:email], id: params[:sender_id])
    if user.empty?
      user = Talentist.where(email: params[:email], id: params[:sender_id])
    end
    if user.empty?
      user = Headhunter.where(email: params[:email], id: params[:sender_id])
    end
    p "USER sender is #{user}"
    return user.first
  end

  def set_conversation
    p "CONVERSATION_ID is #{params[:conversation_id]}"
    @conversation = Mailboxer::Conversation.find(params[:conversation_id])
  end
  def render_error
    render json: { errors: @conversation.errors.full_messages },
      status: :unprocessable_entity
  end

end
