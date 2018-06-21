class HeadhunterMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.headhunter_mailer.alerte.subject
  #
  def alerte(user)
    @user = user
    mail( to: user.email , subject: "Un nouveau talent pourrait t'intéresser")
  end
end
