# Preview all emails at http://localhost:3000/rails/mailers/talent_mailer
class TalentMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/talent_mailer/welcome
  def welcome
    @talent = Talent.first.id
    TalentMailer.welcome(@talent)
  end

  def candidate
    @talent = Talent.first.id
    TalentMailer.candidate(@talent)
  end

  def pdf_of_user_information
    @talent = Talent.first.id
    TalentMailer.pdf_of_user_information(@talent)
  end
  
  def invited
    @talent = Talent.first.id
    @headhunter = Headhunter.first.id
    TalentMailer.invited(@talent, @headhunter)
  end

  def accepted
    @talent = Talent.first.id
    TalentMailer.accepted(@talent)
  end

  def refused
    @talent = Talent.first.id
    TalentMailer.refused(@talent)
  end

  def reminder_completed
    @talent = Talent.first.id
    TalentMailer.reminder_completed(@talent)
  end

end
