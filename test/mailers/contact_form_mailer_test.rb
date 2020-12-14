require 'test_helper'

class ContactFormMailerTest < ActionMailer::TestCase
  test "contact_form" do
    assert_emails(0)
    mail = ContactFormMailer.contact_form(contact_forms(:contact_form))

    mail.deliver_now
    assert_emails(1)

    assert_equal("Contact_form_name, vous a contacté via le formulaire Contactn de The Talentist!", mail.subject)
    assert_equal(['test_email@mail.com'], mail.to)
    assert_equal(['bienvenue@thetalentist.com'], mail.from)
  end
end
