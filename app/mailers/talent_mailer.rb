class TalentMailer < ApplicationMailer


  def welcome(user)
    @user = user  # Instance variable => available in view

    mail(to: @user.email, subject: "Bienvenue sur The Talentist!")
    # This will render a view in `app/views/talent_mailer`!
  end

  def new_message(message, receveur, envoyeur)
    @receveur = receveur
    @envoyeur = envoyeur
    @message = message

    mail(
      to:       @receveur.email,
      subject:  "Vous avez reçu un nouveau message de #{@envoyeur.firstname.capitalize}!"
      )
  end

end
