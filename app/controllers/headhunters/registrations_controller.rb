# frozen_string_literal: true

class Headhunters::RegistrationsController < Devise::RegistrationsController




def create
  @headhunter = Headhunter.new(headhunter_params)
  if @headhunter.save
    session[:headhunter_id] = @headhunter.id
    redirect_to steps_startup_infos_path
  else
    render :new
    raise
  end
end

private

  def headhunter_params
    params.require(:headhunter).permit(:firstname, :job, :email, :password, :startup_id)
  end

end
