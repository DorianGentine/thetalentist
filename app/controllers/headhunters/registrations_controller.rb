# frozen_string_literal: true

class Headhunters::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @headhunter = Headhunter.new
    authorize @headhunter
  end

  def create
    @headhunter = Headhunter.new(headhunter_params)
    authorize @headhunter

    if @headhunter.startup == nil

      if @headhunter.save(validate: false)
        session[:headhunter_id] = @headhunter.id
        redirect_to steps_startup_info_path(:startup)
      else
        render :new
      end

    else

      if @headhunter.save
        session[:headhunter_id] = @headhunter.id
        redirect_to repertoire_path
      else
        render :new
      end

    end
  end

  private

    def headhunter_params
      params.require(:headhunter).permit(:firstname, :job, :email, :password, :startup_id)
    end

end

