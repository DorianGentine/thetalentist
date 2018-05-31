class TalentsController < ApplicationController
  # def index
  # end

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
