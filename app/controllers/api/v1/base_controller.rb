class Api::V1::BaseController < ActionController::API
  include Pundit

  before_action :current_user
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  rescue_from StandardError,                with: :internal_server_error
  rescue_from Pundit::NotAuthorizedError,   with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def current_user
    if current_talent
      @current_talent
    elsif current_talentist
      @current_talentist
    elsif current_headhunter
      @current_headhunter
    else
      false
    end
  end
  def user_not_authorized(exception)
    render json: {
      error: "Unauthorized #{exception.policy.class.to_s.underscore.camelize}.#{exception.query}"
    }, status: :unauthorized
  end

  def not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def internal_server_error(exception)
    if Rails.env.development?
      response = { type: exception.class.to_s, message: exception.message, backtrace: exception.backtrace }
    else
      response = { error: "Internal Server Error" }
    end
    render json: response, status: :internal_server_error
  end
end
