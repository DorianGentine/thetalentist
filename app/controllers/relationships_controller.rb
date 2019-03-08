class RelationshipsController < ApplicationController

  def create
    @relationship = Relationship.create(relationship_params)
    authorize @relationship

    @talent = @relationship.talent
    @relationship.status = "pending"
    if @relationship.save
      @headhunter = @relationship.headhunter
      @headhunter.send_message(@talent, "#{@headhunter.firstname} souhaite rentrer en contact avec vous", "#{@headhunter.firstname}")
      raise
      flash[:success] = "Relationship was created!"
      # redirect_to repertoire_path, flash: {notice: "Vous êtes maintenant en relation avec ce Talent."}
      @talent.send_invitation(@headhunter)
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
  end

  private

  def relationship_params
    params.require(:relationship).permit(:talent_id, :headhunter_id)
  end

  def headhunter_params
    params.require(:relationship).permit(:headhunter_id)
  end
end

