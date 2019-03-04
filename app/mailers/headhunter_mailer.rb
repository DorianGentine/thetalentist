class HeadhunterMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.headhunter_mailer.alerte.subject
  #
  def accepted(user_id)
    @user = Headhunter.find(user_id)

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Profil accepté :)"
      )
  end

  def reminder(user_id)
    @user = Headhunter.find(user_id)
    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Vous nous manquez déjà")
  end


  def in_relation(user_id, talent_id, status)
    @user = Headhunter.find(user_id)
    @talent = Talent.find(talent_id)

    if status == "Accepter"
      @connected = true
      @status = "accepté"
      @firstname = @talent.firstname
    else
      @connected = false
      @status = "refusé"
      @firstname = "Le talent"
    end

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "#{@firstname} a #{@status} ton inviation"
      )
  end


  def alerte(user_id)
    @user = Headhunter.find(user_id)

    mail( to: user.email ,cc: "bienvenue@thetalentist.com", subject: "Un nouveau talent pourrait t'intéresser")
  end
end
