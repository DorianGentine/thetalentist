require 'test_helper'

class HeadhunterMailerTest < ActionMailer::TestCase
  test 'alerte' do
    assert_emails(0)
    mail = HeadhunterMailer.alerte(headhunters(:headhunter).id)

    mail.deliver_now
    assert_emails(1)

    assert_equal("Un nouveau talent pourrait t'intéresser", mail.subject)
    assert_equal(['headhunter@mail.com'], mail.to)
    assert_equal(['bienvenue@thetalentist.com'], mail.from)
  end
end
