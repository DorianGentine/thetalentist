class FormationsController < ApplicationController

  def update
    @talentist = Talentist.find(params[:talentist_id])
    @formation = Formation.find(params[:id])
    if @formation.update(params_formation)
      respond_to do |format|
        format.html { redirect_to talents_path }
        format.js  # <-- will render `app/views/reviews/create.js.erb`
      end
    else
      respond_to do |format|
        format.html { redirect_to talents_path }
        format.js  # <-- will render `app/views/reviews/create.js.erb`
      end
    end
    authorize @talentist
  end

  private

  def params_formation
    params.require(:formation).permit(:type_of_formation, :ranking)
  end

end
