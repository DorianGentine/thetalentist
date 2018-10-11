class TalentMailer < ApplicationMailer

  def candidate(user)
    @user = user
    pdf = UserInfoPdf.new(@user)
    attachments["#{@user.firstname}_#{@user.name}.pdf"] = { :mime_type => 'application/pdf', :content => pdf.render }
    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Bonjour #{@user.firstname}, candidature !"
      )
  end

  def invited(user, headhunter)
    @user = user
    @headhunter = headhunter

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Vous avez été invité"
      )
  end

  def accepted(user)
    @user = user
    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "#{@user.firstname}, ton profil a été accpeté :D"
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
