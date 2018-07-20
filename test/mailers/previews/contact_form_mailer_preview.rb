# Preview all emails at http://localhost:3000/rails/mailers/contact_form_mailer
class ContactFormMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/contact_form_mailer/contact_form
  def contact_form
    ContactFormMailer.contact_form
  end

end
