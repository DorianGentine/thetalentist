class ApplicationMailer < ActionMailer::Base
  # TODO changer le mail
  default from: 'donatien@rollandmail.com'
  layout 'mailer'

  def welcome(user)
    @user = user  # Instance variable => available in view

    mail(
      to: @user.email,
      cci:Talentist.first.email,
      subject: "Bienvenue sur The Talentist!")
    # This will render a view in `app/views/talent_mailer`!
  end


  def new_user(user)
    # @user = user  # Instance variable => available in view
    # @talentist1 = Talentist.first
    # @talentist2 = Talentist.last

    # if @user.is_a?(Talent)
    #   @type = "Talent"
    # elsif @user.is_a?(Headhunter)
    #   @type = "Recruteur"
    # else
    #   @type = "Startup"
    # end

    # mail(
    #   to: @talentist1.email,
    #   cci:Talentist.first.email,
    #   subject: "Un nouveau membre sur la plateforme")
    # # This will render a view in `app/views/talent_mailer`!
  end



  def new_message(message, receveur, envoyeur)
    @receveur = receveur
    @envoyeur = envoyeur
    @message = message

    mail(
      to:       @receveur.email,
      cci: Talentist.first.email,
      subject:  "Vous avez reçu un nouveau message de #{@envoyeur.firstname}!"
      )
  end

end
