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

  test 'recommanded' do
    assert_emails(0)
    mail = HeadhunterMailer.recommanded(
      headhunters(:headhunter).id,
      talents(:talent).id
    )

    pdf_mock = Minitest::Mock.new
    pdf_mock.expect(:generate, 'pdf_file')

    TalentRecommendationPdf.stub(:new, pdf_mock) do
      mail.deliver_now
      assert_emails(1)

      assert_equal('Alex, ce talent devrait te plaire', mail.subject)
      assert_equal(['headhunter@mail.com'], mail.to)
      assert_equal(['bienvenue@thetalentist.com'], mail.from)

      assert_equal(
        mail.attachments.first.filename, 'recommandation_de_talents.pdf'
      )
    end

    pdf_mock.verify
  end
end
