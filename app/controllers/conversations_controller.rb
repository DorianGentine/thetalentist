class ConversationsController < ApplicationController



  def show
    @conversation = current_user.mailbox.conversations.find(params[:id])
    @conversations = current_user.mailbox.conversations


    authorize @conversation
  end

  def new
    @recipients = User.all - [current_user]
  end

  def create
    if current_user == current_headhunter
      recipient = Talent.find(params[:talet_id])
      receipt = current_user.send_message(recipient, params[:body], params[:subject])
      redirect_to conversation_path(receipt.conversation)
    end
  end

private


end
