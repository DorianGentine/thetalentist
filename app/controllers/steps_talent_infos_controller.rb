class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :formations, :experiences, :next_aventure
  # TODO: before actions add find_talent for show and update
  before_action :find_talent, only: [:show, :update]

  def show
    # @talent_formation = TalentFormation.new
    @talent.talent_formations.build
    @talent.experiences.build
    render_wizard
  end

  def update
    # une fois que tu auras plusieurs étapes, il faudra ajouter un champ "status" et le mettre à jour comme suit :
    # Si tu as un problème de validation pour créer talent
    # @talent.status = step.to_s
    # @talent.status = 'active' if step == steps.last
      raise
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
     params.require(:talent).permit(
      :btoc,
      :btob,
      :sector_ids,
      job_ids: [],
      experiences_attributes: Experience.attribute_names.map(&:to_sym).push(:_destroy),
      # talent_formations_attributes: TalentFormation.attribute_names.map(&:to_sym).push(:_destroy),
      talent_formations_attributes: [:id, :title, :year, formation_id: []],
      formation_ids: [],
      language_ids: []
    )

  end

end


