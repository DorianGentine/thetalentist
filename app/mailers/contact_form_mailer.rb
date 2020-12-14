class ContactFormMailer < ApplicationMailer
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
