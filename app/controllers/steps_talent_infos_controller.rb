class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :formations, :experiences, :next_aventure

  before_action :find_talent, only: [:show, :update]
  skip_before_action :authenticate!
  skip_before_action :current_user


  skip_before_action :authenticate!, only: [ :show, :create ]
  skip_before_action :current_user, only: [ :show, :create ]



  def show
    # @talent_formation = TalentFormation.new
    @talent.talent_formations.build
    @talent.talent_languages.build
    @talent.experiences.build
    @talent.next_aventures.build
    render_wizard
  end

  def update
    # une fois que tu auras plusieurs étapes, il faudra ajouter un champ "status" et le mettre à jour comme suit :
    # Si tu as un problème de validation pour créer talent
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
      experiences_attributes: Experience.attribute_names.map(&:to_sym).push(:_destroy),
      next_aventures_attributes: NextAventure.attribute_names.map(&:to_sym).push(:_destroy),
      talent_formations_attributes: [ :title, :year, :formation_id],
      talent_languages_attributes: [ :level, :language_id],
      techno_ids: [],
      sector_ids: []
    )
  end
end
