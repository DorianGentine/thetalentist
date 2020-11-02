# Preview all emails at http://localhost:3000/rails/mailers/headhunter_mailer
class HeadhunterMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/welcome
  def welcome
    @headhunter = Headhunter.first.id
    HeadhunterMailer.welcome(@headhunter)
  end

  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/accepted
  def accepted
    @headhunter = Headhunter.first.id
    HeadhunterMailer.accepted(@headhunter)
  end
  
  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/reminder
  def reminder
    @headhunter = Headhunter.first.id
    HeadhunterMailer.reminder(@headhunter)
  end
  
  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/in_relation_accepted
  def in_relation_accepted
    @headhunter = Headhunter.first.id
    @talent = Talent.first.id
    @status = "Accepter"
    HeadhunterMailer.in_relation(@headhunter, @talent, @status)
  end
  
  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/in_relation_refused
  def in_relation_refused
    @headhunter = Headhunter.first.id
    @talent = Talent.first.id
    @status = "refusé"
    HeadhunterMailer.in_relation(@headhunter, @talent, @status)
  end
  
  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/alerte
  def alerte
    @headhunter = Headhunter.first
    HeadhunterMailer.alerte(@headhunter.id)
  end
  
  # Preview this email at http://localhost:3000/rails/mailers/headhunter_mailer/recommanded
  def recommanded
    @headhunter = Headhunter.first
    @talent = Talent.first
    HeadhunterMailer.recommanded(@headhunter.id, @headhunter.id)
  end

end
