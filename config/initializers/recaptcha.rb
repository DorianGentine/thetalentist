Recaptcha.configure do |config|
  config.site_key  = ENV["RECAPTCHA_SITE_KEY_V2"]
  config.secret_key = ENV["RECAPTCHA_SECRET_KEY_V2"]
end