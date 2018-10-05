class TalentMailer < ApplicationMailer

  def candidate(user)
    @user = user
    # @pdf = pdf
    mail(
      to: @user.email,
      cci:Talentist.first.email,
      subject: "Bonjour #{@user.firstname}, candidature !"
      )
  end

  def invited(user, headhunter)
    @user = user
    @headhunter = headhunter

    mail(
      to: @user.email,
      cci:Talentist.first.email,
      subject: "Vous avez été invité"
      )
  end

  def accepted(user)
    @user = user
    # attachments["#{@user.firstname}_#{Time.now.strftime("%m%d_%Y")}.pdf"] = pdf_file
    mail(
      to: @user.email,
      cci: Talentist.first.email,
      subject: "#{@user.firstname}, ton profil a été accpeté :D"
      )
  end

  def refused(user)
    @user = user

    mail(
      to: @user.email,
      cci:Talentist.first.email,
      subject: "#{@user.firstname}, ton profil a été refusé"
      )

  end

end
