class ConversationsController < ApplicationController

  before_action :user_conversation, only: [ :show, :update ]
  # before_action :user_conversations, only: [ :show, :update ]

  def show
    # 1. Liste des conversations dont la relationship n'est pas acceptée = construire @pending_conversations
    # Les messages des recruteurs avec lesquels j'ai une relationship "pending"
    # user = current_user
    if current_user.is_a?(Talent)
      pending_relationships = Relationship.where(talent_id: current_user.id).where(status: "pending")
      # Return un array des relationship avec le talent
      pending_ids = []
      # Return un array des ids headhunter des ces relationships
      pending_relationships.each do |relationship|
        pending_ids << relationship.headhunter_id
      end
      @pending_conversations = []
      conversations = current_user.mailbox.conversations
      conversations.each do |conversation|
        participant = (conversation.participants - [current_user]).first
        if pending_ids.include?(participant.id)
          @pending_conversations << conversation
        end
      end
    else
      pending_relationships = Relationship.where(headhunter_id: current_user.id).where(status: "pending")
      # Return un array des relationship avec le headhunter
      pending_ids = []
      # Return un array des ids headhunter des ces relationships
      pending_relationships.each do |relationship|
        pending_ids << relationship.talent_id
      end
      @pending_conversations = []
      conversations = current_user.mailbox.conversations
      conversations.each do |conversation|
        participant = (conversation.participants - [current_user]).first
        if pending_ids.include?(participant.id)
          @pending_conversations << conversation
        end
      end
    end



    # 2. Liste les conversations avec nouveau message et les ordonner construire @unread_conversations
    conversations = current_user.mailbox.conversations - @pending_conversations
    @unread_conversations = []
    conversations.each do |conversation|
      if conversation.is_unread?(current_user)
        @unread_conversations << conversation
      end
    end

    # 3. Lister les conversations lues et les ordonner = construire @read_conversations
    @read_accepted_conversations = conversations - @unread_conversations

    accepters = Relationship.where(status: "Accepter")
    pendings = Relationship.all.where(status:"pending")

    participant = @conversation.participants - [current_user]
    @participant = participant[0]

    if current_user.is_a?(Talent)
      @connexion = current_user.is_connected_to?(@participant)
      user_relationship
    else current_user.is_a?(Headhunter)
      relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", current_user.id, @participant.id)
      @relationship = relationship[0]
    end


    # Partie création d'un message
    @message = Mailboxer::Message.new
  end

  def update
    participant = @conversation.participants - [current_user]
    @participant = @conversation.participants - [current_user]
    user_relationship
    if @relationship.update(status:params[:commit])
      redirect_to conversation_path(@conversation)
    else
      raise
    end
  end


  # def create
  #   if current_user == current_headhunter
  #     recipient = Talent.find(params[:talet_id])
  #     receipt = current_user.send_message(recipient, params[:body], params[:subject])
  #     redirect_to conversation_path(receipt.conversation)
  #   end
  # end

  private

  def user_conversation
    @conversation = current_user.mailbox.conversations.find(params[:id])
    @conversations = current_user.mailbox.conversations
    authorize @conversation
  end

  def user_relationship
    relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", @participant.id, current_user.id)
    @relationship = relationship[0]
  end

end
