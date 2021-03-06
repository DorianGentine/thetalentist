class Api::V1::RelationshipsController < Api::V1::BaseController



 def create
    p "You are in create Relationship function"
    @relationship = Relationship.new(relationship_params)
    @relationship.status = "pending"
    p "Relationship is created"
    headhunter = @relationship.headhunter
    talent = @relationship.talent
    headhunter.send_message(talent, params[:message], "#{headhunter.firstname}")
    p "C'EST COOL LÀ"
    p "conversation est : #{Mailboxer::Conversation.between(talent, headhunter).last}"
    conversation = Mailboxer::Conversation.between(talent, headhunter).last
    @relationship.conversation_id = conversation.id
    p "=> Message as been created and send"
    if @relationship.save
      talent.send_invitation(headhunter)
      p "relationship created"
      render :show, status: :created
    else
      p "relationship error"
      render_error
    end
    authorize @relationship
  end

  private

  def relationship_params
    params.permit(:talent_id, :headhunter_id)
  end

  def render_error
    render json: { errors: @relationship.errors.full_messages },
      status: :unprocessable_entity
  end
end
