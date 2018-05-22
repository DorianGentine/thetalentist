class Talents::RegistrationsController < Devise::RegistrationsController

  def new
    super
    @talent_hobby = TalentHobby.new
    @talent.talent_hobbies.build.build_hobby
  end

  def create

    # supprimer les string vide
    # params['talent']['hobbies'].delete("")

    @talent = Talent.new(talent_params)
    if @talent.save

      session[:talent_id] = @talent.id
      redirect_to steps_talent_infos_path
    else
      render :new
      raise
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
      :cv,
      :linkedin,
      :job_ids,
      hobby_ids: []
      )
  end
end
