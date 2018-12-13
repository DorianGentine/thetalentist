class TalentMailer < ApplicationMailer

  def candidate(user)
    @user = user
    mail(
      to: @user.email,
      cc: Talentist.first.email,
      subject: "Bonjour #{@user.firstname}, merci pour votre candidature !"
      )
  end

  def data(user)
    @user = user
    pdf = UserInfoPdf.new(@user)
    attachments["#{@user.firstname}_#{@user.name}.pdf"] = { :mime_type => 'application/pdf', :content => pdf.render }
    mail(
      to: @user.email,
      cc: ["#{Talentist.second.email}", "#{Talentist.first.email}"],
      subject: "Bonjour #{@user.firstname}, merci pour votre candidature !"
      )
  end

  def invited(user, headhunter)
    @user = user
    @headhunter = headhunter

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Vous avez été invité par #{@headhunter.firstname} de #{@headhunter.startup.name}"
      )
  end

  def accepted(user)
    @user = user
    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "#{@user.firstname}, ton profil a été accepté :D"
      )
  end

  def refused(user)
    @user = user

    mail(
      to: @user.email,
      cc:"bienvenue@thetalentist.com",
      subject: "#{@user.firstname}, ton profil a été refusé"
      )

  end

end
