class Api::V1::RelationshipsController < Api::V1::BaseController



  def create
    @relationship = Relationship.create(relationship_params)
    @relationship.status = "pending"
    p "=> I'm in Relationship"
    if @relationship.save
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
