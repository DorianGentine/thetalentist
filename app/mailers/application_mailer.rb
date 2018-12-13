class ApplicationMailer < ActionMailer::Base
  # TODO changer le mail
  default from: 'bienvenue@thetalentist.com'
  layout 'mailer'

  def welcome(user)
    @user = user  # Instance variable => available in view

    mail(
      to: @user.email,
      cc: "bienvenue@thetalentist.com",
      subject: "Bienvenue sur The Talentist!")
    # This will render a view in `app/views/talent_mailer`!
  end


  def erreur_message(type_erreur)
    @user = user

    mail(
      to: "donatien@avemcreation, erwan@avemcreation.com, dorian@avemcreation.com",
      cc: "bienvenue@thetalentist.com",
      subject: "Une erreur #{type_erreur} a été reçu sur Talentsit"
      )
  end

  def new_message(message, receveur, envoyeur)
    @receveur = receveur
    @envoyeur = envoyeur
    @message = message

    mail(
      to:       @receveur.email,
      cc: "bienvenue@thetalentist.com",
      subject:  "Vous avez reçu un nouveau message de #{@envoyeur.firstname}!"
      )
  end

end
