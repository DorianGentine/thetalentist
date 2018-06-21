# Preview all emails at http://localhost:3000/rails/mailers/headhunter_mailer
class HeadhunterMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/alerte
  def alerte
    HeadhunterMailer.alerte
  end

end
