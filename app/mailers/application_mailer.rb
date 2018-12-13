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


  def new_user(user)
    @user = user  # Instance variable => available in view
    @talentist1 = Talentist.first
    @talentist2 = Talentist.last

    if @user.is_a?(Talent)
      @type = "Talent"
    elsif @user.is_a?(Headhunter)
      @type = "Recruteur"
    else
      @type = "Startup"
    end

    mail(
      to: @talentist1.email,
      subject: "Un nouveau membre sur la plateforme")
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
      to: @receveur.email,
      cc: "bienvenue@thetalentist.com",
      subject:  "Vous avez reçu un nouveau message de #{@envoyeur.firstname}!"
      )
  end

end
