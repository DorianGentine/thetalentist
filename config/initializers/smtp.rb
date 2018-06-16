ActionMailer::Base.smtp_settings = {
  address: "smtp.thetalentist.com",
  port: 587,
  domain: 'herokuapp.com',
  user_name: ENV['SENDGRID_API_KEY'],
  password: ENV['SENDGRID_API_KEY'],
  authentication: :login,
  enable_starttls_auto: true
}
