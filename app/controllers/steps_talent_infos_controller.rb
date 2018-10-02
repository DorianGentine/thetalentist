class StepsTalentInfosController < ApplicationController
  include Wicked::Wizard
  steps :user_informations, :formations, :experiences, :next_aventure

  before_action :find_talent, only: [:show, :update]
  skip_after_action :verify_authorized
  skip_before_action :authenticate!
  skip_before_action :current_user

  def show
    if @talent.talent_formations.count == 0
      1.times { @talent.talent_formations.build }
    else
      0.times { @talent.talent_formations.build }
    end
    if @talent.talent_jobs.count == 0
      1.times { @talent.talent_jobs.build }
    else
      0.times { @talent.talent_jobs.build }
    end
    if @talent.talent_languages.count == 0
      1.times { @talent.talent_languages.build }
    else
      0.times { @talent.talent_languages.build }
    end
    if @talent.experiences.count == 0
      1.times { @talent.experiences.build }
    else
      0.times { @talent.experiences.build }
    end
    if @talent.next_aventures.count == 0
      1.times { @talent.next_aventures.build }
    else
      0.times { @talent.next_aventures.build }
    end
    if @talent.next_aventures.first.your_small_plus.count == 0
      1.times { @talent.next_aventures.first.your_small_plus.build }
    else
      0.times { @talent.next_aventures.first.your_small_plus.build }
    end


    render_wizard

  end

  def update
    # une fois que tu auras plusieurs étapes, il faudra ajouter un champ "status" et le mettre à jour comme suit :
    # Si tu as un problème de validation pour créer talent
    # @talent.status = step.to_s
    # @talent.status = 'active' if step == steps.last
    case step
    when :next_aventure
      @talent.update(talent_params)
      if !@talent.terms_of_condition
        flash[:notice] = "N'oubliez pas de accepter les conditions générale"
        render "steps_talent_infos/#{step}"
      else
        render_wizard @talent
      end
    else
      if @talent.update(talent_params)
        # @talent = current_user
        render_wizard @talent
      else
        # si l'update ne fonctionne pas, il faut render l'étape sur laquelle tu te trouves donc tu as besoin de la connaître
        # ça render la méthode "show" mais propre à UNE étape en particulier, donc tu dois la nommer explicitement et pas juste "show"
        render "steps_talent_infos/#{step}"
    end
    end


  end

  private

# cela ne suffit pas de déclarer current_user = @talent, il faut un sign_in

  def finish_wizard_path
    if @talent.terms_of_condition
      if @talent.validated
        sign_in(@talent)
        talent_path(@talent)
      else
        @talent.send_candidate
        waiting_for_validation_path
      end
    else
      render "steps_talent_infos/next_aventure"
    end
  end

  def find_talent

    if session[:talent_id]
      @talent = Talent.find(session[:talent_id])
    else
      @talent = current_talent
    end
    # authorize @talent
    # va chercher l'autorisation dans talent_policy.rb dans show? ou dans update? (pas besoin de méthode find_talent?)

  end

  def talent_params
    # ici tu ajouteras au fur et à mesure les champs du formulaire (toutes étapes confondues)
     params.require(:talent).permit(
      :name,
      :firstname,
      :phone,
      :linkedin,
      :city,
      :job_ids,
      :btoc,
      :btob,
      :terms_of_condition,
      :no_more,
      :waiting_for_one,
      :waiting_for_two,
      :waiting_for_three,
      :creative_or_pragmatic,
      :hunter_or_breeder,
      sector_ids:[],
      hobby_ids: [],
      experiences_attributes: [ :id, :company_name, :position, :currently, :years, :starting, :overview, :company_type_id, :_destroy],
      next_aventures_attributes: NextAventure.attribute_names.map(&:to_sym).push(:_destroy),
      # next_aventures_attributes: [ your_small_plus_attributes: [:id, :description, :_destroy] ],
      talent_formations_attributes: [ :id, :title, :year, :formation_id, :_destroy],
      talent_languages_attributes: [ :id, :level, :language_id, :_destroy],
      techno_ids: []
      # your_small_plus_attributes: [:id, :description, :_destroy]
    )
  end
end





















