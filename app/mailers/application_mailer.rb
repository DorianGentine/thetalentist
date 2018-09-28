class ApplicationMailer < ActionMailer::Base
  # TODO changer le mail
  default from: 'donatien@rollandmail.com'
  layout 'mailer'

  def welcome(user)
    @user = user  # Instance variable => available in view

    mail(
      # to: @user.email,
      to: "donatien@rollandmail.com",
      subject: "Bienvenue sur The Talentist!")
    # This will render a view in `app/views/talent_mailer`!
  end

  # def welcome_in_plateforme(user)
  #   @user = user  # Instance variable => available in view

  #   mail(
  #     # to: @user.email,
  #     to: "donatien@rollandmail.com",
  #     subject: "Bienvenue sur La plateforme!")
  #   # This will render a view in `app/views/talent_mailer`!
  # end

  def new_message(message, receveur, envoyeur)
    @receveur = receveur
    @envoyeur = envoyeur
    @message = message

    mail(
      to:       @receveur.email,
      subject:  "Vous avez reçu un nouveau message de #{@envoyeur.firstname}!"
      )
  end


end
