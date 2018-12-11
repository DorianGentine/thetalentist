require_relative 'boot'

require 'rails/all'
require 'pdfkit'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TheTalentist
  class Application < Rails::Application
    # pour Ajax
    config.action_view.embed_authenticity_token_in_remote_forms = true

    config.generators do |generate|
          generate.assets false
          generate.helper false
          generate.test_framework  :test_unit, fixture: false
        end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # test pour les pages erreurs
    config.exceptions_app = self.routes

    config.active_job.queue_adapter = :sidekiq

    # config.middleware.use PDFKit::Middleware
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end

