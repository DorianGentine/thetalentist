class Talents::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate!
  skip_before_action :current_user

  def new
    @talent = Talent.new
    authorize @talent
    @talent_hobby = TalentHobby.new
    @talent.talent_hobbies.build.build_hobby
  end

  def create
    @talentist = Talentist.find_by_email("dimitri@hotmail.fr")
    @talent = Talent.new(talent_params)
    authorize @talent
    if @talent.save
      @talentist.send_message(@talent, "Bonjour #{@talent.firstname}, Bienvenue sur notre plateforme!", "#{@talent.id}")
      session[:talent_id] = @talent.id
      redirect_to steps_talent_info_path(:formations)
    else
      render :new
    end
  end

# faire update dans ici


  private

  def talent_params
    params.require(:talent).permit(
      :firstname,
      :name,
      :city,
      :phone,
      :email,
      :password,
      :password_confirmation,
      :cv,
      :linkedin,
      :sector_ids,
      hobby_ids: []
      )
  end
end
