class ApplicationMailer < ActionMailer::Base
  # TODO changer le mail
  default from: 'bienvenue@thetalentist.com'
  layout 'mailer'

  def new_user(user_class, user_id)
    class_name = user_class.classify.constantize
    @user = class_name.find(user_id)

    @type = user_class.to_s

    mail(
      to: Talentist.all.collect(&:email).join(", "),
      subject: "Un nouveau membre sur la plateforme")
  end

  def erreur_message( current_page, type_erreur)
    @current_page = current_page.present? ? current_page : nil
    @error_datas = type_erreur
    mail(
      to: "donatien@avemcreation.com, dorian@avemcreation.com",
      cc: "bienvenue@thetalentist.com",
      subject: "Une erreur #{@current_page} a été reçu sur Talentsit"
      )
  end

  def new_message(user_class, message, receveur_class, receveur_id, envoyeur_id)
    class_name = user_class.classify.constantize
    @envoyeur = class_name.find(envoyeur_id)
    receveur_class_name = receveur_class.classify.constantize
    @receveur = receveur_class_name.find(receveur_id)
    @message = message

    mail(
      to: @receveur.email,
      cc: "bienvenue@thetalentist.com",
      subject:  "Vous avez reçu un nouveau message de #{@envoyeur.firstname}!"
      )
  end

end
