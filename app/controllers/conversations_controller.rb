class ConversationsController < ApplicationController
  before_action :user_conversation, only: [ :show, :update ]

  def show
    # 1. Liste des conversations dont la relationship n'est pas acceptée = construire @pending_conversations
    # Les messages des recruteurs avec lesquels j'ai une relationship "pending"
    # user = current_user
    good_user

    if @user.is_a?(Talent)
      pending_relationships = Relationship.where(talent_id: @user.id).where(status: "pending")
      # Return un array des relationship avec le talent
      pending_ids = []
      # Return un array des ids headhunter des ces relationships
      pending_relationships.each do |relationship|
        pending_ids << relationship.headhunter_id
      end
      @pending_conversations = []
      conversations = @user.mailbox.conversations
      conversations.each do |conversation|
        participant = (conversation.participants - [@user]).first
        if pending_ids.include?(participant.id)
          @pending_conversations << conversation
        end
      end
    elsif @user.is_a?(Headhunter)
      pending_relationships = Relationship.where(headhunter_id: @user.id).where(status: "pending")
      # Return un array des relationship avec le headhunter
      pending_ids = []
      # Return un array des ids headhunter des ces relationships
      pending_relationships.each do |relationship|
        pending_ids << relationship.talent_id
      end
      @pending_conversations = []
      conversations = @user.mailbox.conversations
      conversations.each do |conversation|
        participant = (conversation.participants - [@user]).first
        if pending_ids.include?(participant.id) && participant.is_a?(Talent)
          @pending_conversations << conversation
        end
      raise if @pending_conversations.count > 1
      end
    end



    # 2. Liste les conversations avec nouveau message et les ordonner construire @unread_conversations
    if @user.is_a?(Talentist)
      @pending_conversations = []
    end

    conversations = @user.mailbox.conversations - @pending_conversations
    @unread_conversations = []
    conversations.each do |conversation|
      if conversation.is_unread?(@user)
        @unread_conversations << conversation
      end
    end

    # 3. Lister les conversations lues et les ordonner = construire @read_conversations
    @read_accepted_conversations = conversations - @unread_conversations

    participant = @conversation.participants - [@user]
    @participant = participant[0]

    if @user.is_a?(Talent)
      @connexion = @user.is_connected_to?(@participant)
      user_relationship
    elsif @user.is_a?(Headhunter)
      relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", @user.id, @participant.id)
      @relationship = relationship[0]
    else
    end

    # diplay messages
    @messages = @conversation.receipts_for(@user).order("created_at ASC")
    # Partie création d'un message
    @message = Mailboxer::Message.new


    # Au click la conversation passer de unread a read
    if !params[:headhunter_id].present? && !params[:talent_id].present?
      @conversation.mark_as_read(@user)
    end
    authorize @user
  end

  def update
    # mise a jour du status par le talent (accepter our refuser)
    participant = @conversation.participants - [current_user]
    @participant = @conversation.participants - [current_user]
    @participant = participant[0]
    user_relationship
    if @relationship.update(status:params[:commit])
      status = @relationship.status
      @participant.send_relation(current_user, status)

      redirect_to conversation_path(@conversation)
    end
  end

  private

  def good_user
    if current_user.is_a?(Talent)
      @user = current_user
    elsif current_user.is_a?(Headhunter)
      @user = current_user
    elsif current_user.is_a?(Talentist)
      if params[:talent_id]
        @user = Talent.find(params[:talent_id])
      elsif params[:headhunter_id]
        @user = Headhunter.find(params[:headhunter_id])
      else
        @user = current_user
      end
    else
      false
    end
  end

  def user_conversation
    good_user
    # @conversation = Mailboxer::Conversation.find(params[:id])
    @conversation = @user.mailbox.conversations.find(params[:id])
    @conversations = @user.mailbox.conversations
    authorize @conversation
  end

  def user_relationship
    relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", @participant.id, current_user.id)
    @relationship = relationship[0]
  end

end
