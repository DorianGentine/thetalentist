class RelationshipsController < ApplicationController

  def create
    @relationship = Relationship.create(relationship_params)
    @relationship.status = "pending"
    if @relationship.save
      respond_to do |format|
        format.html { redirect_to repertoire_path }
        format.js  # <-- will render `app/views/reviews/create.js.erb`
      end
    else
      respond_to do |format|
        format.html { render 'repertoire' }
        format.js  # <-- idem
      end
    end
    authorize @relationship
  end

  private

  def relationship_params
    params.require(:relationship).permit(:talent_id, :headhunter_id)
  end
end

