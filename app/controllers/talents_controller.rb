class TalentsController < ApplicationController

  def update
    @relationship = Relationship.new
    @headhunter = @current_headhunter
    @talent = Talent.find(params[:id])

    @relationship = Relationship.create(headhunter_id:@headhunter.id, talent_id:@talent.id, status:"pending")
    if @relationship.save
      @headhunter.send_message(@talent, "#{@headhunter.firstname}, souhaite rentrer en contact avec vous", "#{@headhunter.firstname}")
      flash[:success] = "Relationship was created!"
      redirect_to repertoire_path
    else

    end
    authorize @headhunter

  end

  def show
    @talents = Talent.all
    @talent = Talent.find(params[:id])
    authorize @talent

    if params[job_ids: []]
      raise
      # if params[job_ids: []][equipment].present?
      #   @bikes = @bikes.where(equipment.to_sym => true)
      # end
    end

  end





end
