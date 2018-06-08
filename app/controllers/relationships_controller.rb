class RelationshipsController < ApplicationController


  def index
    @user = @current_user
    @relationships = @user.relationships
    @relationships = policy_scope(@user.relationships.all)
  end


  def show
    @relationship = Relationship.find(params[:id])
    authorize @relationship



  end

  def create
    raise
  end
end
