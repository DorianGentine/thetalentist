class ConversationsController < ApplicationController



  def show

    accepters = Relationship.where(status: "Accepter")
    pendings = Relationship.all.where(status:"pending")

    @conversation = current_user.mailbox.conversations.find(params[:id])
    @conversations = current_user.mailbox.conversations

    participant = @conversation.participants - [current_user]
    @participant = participant[0]

    if current_user.is_a?(Talent)
      @connexion = current_user.is_connected_to?(@participant)
      relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", @participant.id, current_user.id)
      @relationship = relationship[0]
    else current_user.is_a?(Headhunter)
      relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", current_user.id, @participant.id)
      @relationship = relationship[0]
    end

    authorize @conversation
  end

  def update
    @conversation = current_user.mailbox.conversations.find(params[:id])
    @conversations = current_user.mailbox.conversations
    @participant = @conversation.participants - [current_user]
    relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", @participant[0].id, current_user.id)
    @relationship = relationship[0]
    if @relationship.update(status:params[:commit])
      redirect_to conversation_path(@conversation)
    else
      raise
    end
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

end
