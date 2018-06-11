class MessagesController < ApplicationController
  before_action :set_conversation

  def create
    # message = current_user.reply_to_conversation(@conversation, params[:body], subject = nil, should_untrash = true, sanitize_text = true, attachment = params["attachment"].open)
    # raise
    receipt = current_user.reply_to_conversation(@conversation, params[:body])
    redirect_to conversation_path(receipt.conversation)
    authorize @conversation
  end

  private

  def set_conversation
    @conversation = current_user.mailbox.conversations.find(params[:conversation_id])
  end
end
