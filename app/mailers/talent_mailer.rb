class TalentMailer < ApplicationMailer

  def candidate(user)
    @user = user
    # @pdf = pdf
    mail(
      to: @user.email,
      subject: "Bonjour #{@user.firstname}, candidature !"
      )
  end

  def invited(user, headhunter)
    @user = user
    @headhunter = headhunter

    mail(
      to: @user.email,
      subject: "Vous avez été invité"
      )
  end

  def accepted(user)
    @user = user

    mail(
      to: @user.email,
      subject: "Profil accepté :)"
      )
  end

  def refused(user, descritpion)
    @user = user
    @descritpion = descritpion

    mail(
      to: @user.email,
      subject: "Profil refusé"
      )

  end

end
