class TalentsController < ApplicationController

  def index
    @talentist = current_talentist
    @talents = Talent.all
    @talents = policy_scope(Talent)
    if params[:tag].blank?
      @talents = Talent.all.order(updated_at: :desc)
    else
      @talents = []
      # les talents dont le job est : params[:tag]
      talent_jobs = TalentJob.joins(:job).where(:jobs => {:title => params[:tag]})
      talent_jobs.each do |job|
        @talents << Talent.find(job.talent_id)
      end
    end
    if params[:tag] == "Data"
      @titre = "DATA"
    elsif params[:tag] == "Sales"
      @titre = "SALES"
    elsif params[:tag] == "Market"
      @titre = "MARKET"
    elsif params[:tag] == "Product"
      @titre = "PRODUCT"
    end
  end


  def show
    @talents = Talent.all
    @talent = Talent.find(params[:id])
    authorize @talent

    @experiences = @talent.experiences.order(:years)
    @talent_formations = @talent.talent_formations.order(:year)
    @sectors = @talent.next_aventures.last.next_aventure_sectors
    @credentials = @talent.credentials
  end

  def update
    if @headhunter = current_headhunter
      @relationship = Relationship.new
      @talent = Talent.find(params[:id])

      @relationship = Relationship.create(headhunter_id:@headhunter.id, talent_id:@talent.id, status:"pending")
      if @relationship.save
        @headhunter.send_message(@talent, "#{@headhunter.firstname}, souhaite rentrer en contact avec vous", "#{@headhunter.firstname}")
        flash[:success] = "Relationship was created!"
        redirect_to repertoire_path
      end
      authorize @headhunter

    # elsif current_talent.relationships.last.status == "pending"

    #   @relationship = Relationship.where("headhunter_id = ? AND talent_id = ?", @participant[0].id, current_user.id)
    else
      @talent = Talent.find(params[:id])
      @talent.update_attributes(talent_params)
      redirect_to talent_path(@talent)
      authorize @talent
    end
  end

private

  def talent_params
    # ici tu ajouteras au fur et à mesure les champs du formulaire (toutes étapes confondues)
     params.require(:talent).permit(
      :overview,
      :photo,
      experiences_attributes:[ :id, :company_name, :years, :starting, :overview, :position, :currently, :_destroy],
      talent_formations_attributes:[ :id, :title, :year, :level, :formation_id, :_destroy],
      next_aventures_attributes:[ :id, :remuneration, :contrat, :overview, :city, :no_more, :_destroy, sector_ids: [] ]
      )
  end

end


