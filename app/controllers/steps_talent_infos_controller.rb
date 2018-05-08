class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :experiences, :formations, :skills
  # TODO: before actions add find_talent for show and update

  def show
    @talent = Talent.find(session[:talent_id])
    @sectors = Sector.all
    render_wizard
  end

  def update
    @talent = Talent.find(session[:talent_id])
    # une fois que tu auras plusieurs étapes, il faudra ajouter un champ "status" et le mettre à jour comme suit :
    # @talent.status = step.to_s
    # @talent.status = 'active' if step == steps.last

    if @talent.update(talent_params)
      render_wizard @talent
    else
      # si l'update ne fonctionne pas, il faut render l'étape sur laquelle tu te trouves donc tu as besoin de la connaître
      # ça render la méthode "show" mais propre à UNE étape en particulier, donc tu dois la nommer explicitement et pas juste "show"
      render "steps_talent_infos/#{step}"
    end
  end

  private

  def find_talent
    @talent = Talent.find(session[:talent_id])
  end

  def talent_params
    # ici tu ajouteras au fur et à mesure les champs du formulaire (toutes étapes confondues)
    params.require(:talent).permit(sector_ids: [])
  end

end



