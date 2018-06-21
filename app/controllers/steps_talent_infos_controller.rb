class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :formations, :experiences, :next_aventure

  before_action :find_talent, only: [:show, :update]
  skip_before_action :authenticate!
  skip_before_action :current_user

  def show
    1.times { @talent.talent_formations.build }
    1.times { @talent.talent_languages.build }
    1.times { @talent.experiences.build }
    1.times { @talent.next_aventures.build }
    render_wizard
  end

  def update
    # une fois que tu auras plusieurs étapes, il faudra ajouter un champ "status" et le mettre à jour comme suit :
    # Si tu as un problème de validation pour créer talent
    # @talent.status = step.to_s
    # @talent.status = 'active' if step == steps.last
    if @talent.update(talent_params)
      # @talent = current_user
      render_wizard @talent
    else
      # si l'update ne fonctionne pas, il faut render l'étape sur laquelle tu te trouves donc tu as besoin de la connaître
      # ça render la méthode "show" mais propre à UNE étape en particulier, donc tu dois la nommer explicitement et pas juste "show"
      render "steps_talent_infos/#{step}"
    end
  end

  private

# cela ne suffit pas de déclarer current_user = @talent, il faut un sign_in

  def finish_wizard_path
    sign_in(@talent)
    talent_path(@talent)
  end
  def find_talent
    @talent = Talent.find(session[:talent_id])
    authorize @talent
    # va chercher l'autorisation dans talent_policy.rb dans show? ou dans update? (pas besoin de méthode find_talent?)

  end

  def talent_params
    # ici tu ajouteras au fur et à mesure les champs du formulaire (toutes étapes confondues)
     params.require(:talent).permit(
      :btoc,
      :btob,
      :sector_ids,
      job_ids: [],
      hobby_ids: [],
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
      next_aventures_attributes: NextAventure.attribute_names.map(&:to_sym).push(:_destroy),
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :_destroy],
      talent_languages_attributes: [ :id, :level, :language_id, :_destroy],
      techno_ids: [],
      sector_ids: []
    )
  end
end
