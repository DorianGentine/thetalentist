require 'test_helper'

class HeadhunterMailerTest < ActionMailer::TestCase
  test "alerte" do
    mail = HeadhunterMailer.alerte
    assert_equal "Alerte", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
