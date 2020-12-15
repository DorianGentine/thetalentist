require 'test_helper'

class TalentMailerTest < ActionMailer::TestCase
  test 'welcome' do
    assert_emails(0)
    mail = TalentMailer.welcome(talents(:talent).id)

    mail.deliver_now
    assert_emails(1)

    assert_equal('Bienvenue sur The Talentist!', mail.subject)
    assert_equal(['talent@mail.com'], mail.to)
    assert_equal ['bienvenue@thetalentist.com'], mail.from
  end
end
