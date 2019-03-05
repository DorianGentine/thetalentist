class TalentMailer < ApplicationMailer

  def candidate(user_id)
    @user = Talent.find(user_id)
    mail(
      to: @user.email,
      cc: Talentist.first.email,
      subject: "Bonjour #{@user.firstname}, merci pour votre candidature !"
      )
  end

  def pdf_of_user_information(user_id)
    @user = Talent.find(user_id)
    pdf = UserInfoPdf.new(@user)
    attachments["#{@user.firstname}_#{@user.name}.pdf"] = { :mime_type => 'application/pdf', :content => pdf.render }
    mail(
      to: @user.email,
      cc: ["#{Talentist.second.email}", "#{Talentist.first.email}"],
      subject: "Bonjour #{@user.firstname}, merci pour votre candidature !"
      )
  end

  def invited(user_id, headhunter_id)
    @user = Talent.find(user_id)
    @headhunter = Headhunter.find(headhunter_id)

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Vous avez été invité par #{@headhunter.firstname} de #{@headhunter.startup.name}"
      )
  end

  def accepted(user_id)
    @user = Talent.find(user_id)
    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "#{@user.firstname}, ton profil a été accepté :D"
      )
  end

  def refused(user_id)
    @user = Talent.find(user_id)

    mail(
      to: @user.email,
      cc:"bienvenue@thetalentist.com",
      subject: "#{@user.firstname}, ton profil a été refusé"
      )
  end

  def reminder_completed(user_id)
    @user = Talent.find(user_id)
    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Vous nous manquez déjà")
  end


end
