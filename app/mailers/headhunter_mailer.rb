class HeadhunterMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.headhunter_mailer.alerte.subject
  #
  def accepted(user)
    @user = user

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Profil accepté :)"
      )
  end

  def in_relation(user, talent, status)
    @user = user
    @talent = talent

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

  def inscription_startup()

  end

  def alerte(user)
    @user = user,

    mail( to: user.email ,cc: "bienvenue@thetalentist.com", subject: "Un nouveau talent pourrait t'intéresser")
  end
end
