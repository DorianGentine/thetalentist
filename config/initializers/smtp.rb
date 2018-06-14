ActionMailer::Base.smtp_settings = {
  address: "smtp.thetalentist.com",
  port: 587,
  domain: 'herokuapp.com',
  user_name: ENV['GMAIL_ADDRESS'],
  password: ENV['GMAIL_APP_PASSWORD'],
  authentication: :login,
  enable_starttls_auto: true
}
