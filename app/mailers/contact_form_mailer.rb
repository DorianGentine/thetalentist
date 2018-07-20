class ContactFormMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.contact_form_mailer.contact_form.subject
  #
  def contact_form
    @greeting = "Hi"

    mail to: "to@example.org"
  end

  def contact_form(contact)
    @email = contact.email
    @name = contact.name
    if contact.phone
      @phone = contact.phone
    end
    if contact.message
      @message = contact.message
    end
    if contact.subject
      @subject = contact.subject
    end

    mail(to: @email, subject: "#{@name.capitalize}, vous a contacté via le formulaire Contactn de The Talentist!")
  end
end
