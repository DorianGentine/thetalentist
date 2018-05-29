# frozen_string_literal: true

class Headhunters::RegistrationsController < Devise::RegistrationsController




def create
  @headhunter = Headhunter.new(headhunter_params)

  if @headhunter.startup == nil

    if @headhunter.save(validate: false)
      session[:headhunter_id] = @headhunter.id
      redirect_to steps_startup_infos_path
    else
      render :new
    end

  else

    if @headhunter.save
      session[:headhunter_id] = @headhunter.id
      raise
      redirect_to repertoire_path
    else
      render :new
      raise
    end

  end
end

private

  def headhunter_params
    params.require(:headhunter).permit(:firstname, :job, :email, :password, :startup_id)
  end

end

