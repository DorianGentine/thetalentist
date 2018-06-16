class EmailInterceptor
  def self.delivering_email(message)
    message.subject = "#{message.to} #{message.subject}"
    message.to = [ ENV['EMAIL_DEV'] ]
  end
end
