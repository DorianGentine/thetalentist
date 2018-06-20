class TalentsController < ApplicationController

  def index
    @talentist = current_talentist
    @talents = Talent.all
    @talents = policy_scope(Talent)

    if params[:tag].blank?
      @talents = Talent.all.order(name: :asc)
      @titre = 'All'
    else
      # les talents dont le job est : params[:tag]
      if params[:tag] == "Tous"
        @talents = Talent.all
        @titre = "Tous"
      elsif params[:tag] == "Valider"
        @talents = Talent.where(:validated => true)
        @titre = "Valider"
      elsif params[:tag] == "Refuser"
        @talents = Talent.where(:validated => false)
        @titre = "Refuser"
      elsif params[:tag] == "En attende"
        @talents = Talent.where(:validated => nil)
      elsif params[:tag] == "Visible"
        @titre = "En attente"
        @talents = Talent.where(:visible => true)
        @titre = "Visible"
        # envoyer un message quand un talent passe visible et le job a une alert
      else params[:tag] == "Invisible"
        @talents = Talent.where(:visible => false)
        @titre = "Invisible"
      end
    end
  end

  def repertory
    @talent = current_talent
    relationships = Relationship.where(talent_id: current_user.id)
    @headhunters = []

    relationships.each do |relationship|
      @headhunters << Headhunter.find(relationship.headhunter_id)
    end
    authorize @talent
  end

  def show
    @talents = Talent.all
    @talent = Talent.find(params[:id])
    authorize @talent

    currently = @talent.experiences.where(currently: true)
    @currently = currently[0]
    @experiences = @talent.experiences.order(:years) - currently

    @talent_formations = @talent.talent_formations.order(:year)
    @sectors = @talent.next_aventures.last.next_aventure_sectors
    @credentials = @talent.credentials
  end

  def update
    # repertoire
    if current_headhunter
      @relationship = Relationship.new
      @talent = Talent.find(params[:id])

      @relationship = Relationship.create(headhunter_id:@headhunter.id, talent_id:@talent.id, status:"pending")
      if @relationship.save
        @headhunter.send_message(@talent, "#{@headhunter.firstname}, souhaite rentrer en contact avec vous", "#{@headhunter.firstname}")
        flash[:success] = "Relationship was created!"
        redirect_to repertoire_path
      end
      authorize @headhunter

    elsif current_talentist
      @talent = Talent.find(params[:id])

      if params[:commit] == "Accepter"
        if @talent.validated == true
          validated_action(nil)
        elsif @talent.validated == false
          validated_action(true)
        else @talent.validated == nil
          validated_action(true)
        end
      elsif params[:commit] == "Refuser"
        if @talent.validated == false
          validated_action(nil)
        elsif @talent.validated == true
          validated_action(false)
        else @talent.validated == nil
          validated_action(false)
        end
      elsif params[:commit] == "Visible"
        if @talent.visible == false || @talent.visible == nil
          visible_action(true)
        end
      else params[:commit] == "Invisible"
        if @talent.visible == true || @talent.visible == nil
          visible_action(false)
        end
      end
      redirect_to talents_path
      authorize @talent
    else
      @talent = Talent.find(params[:id])
      @talent.update_attributes(talent_params)
      redirect_to talent_path(@talent)
      authorize @talent
    end
  end

private

  def visible_action(action)
    @talent.visible = action
    @talent.save
  end

  def validated_action(action)
    @talent.validated = action
    @talent.save
  end

  def talent_params
    # ici tu ajouteras au fur et à mesure les champs du formulaire (toutes étapes confondues)
     params.require(:talent).permit(
      :overview,
      :photo,
      hobby_ids: [],
      skill_ids: [],
      techno_ids: [],
      experiences_attributes:[ :id, :company_name, :years, :starting, :overview, :position, :currently, :_destroy],
      talent_formations_attributes:[ :id, :title, :year, :level, :formation_id, :_destroy],
      next_aventures_attributes:[ :id, :remuneration, :contrat, :overview, :city, :no_more, :_destroy, sector_ids: [] ],
      talent_languages_attributes: [ :id, :language_id ]
      )
  end

end


