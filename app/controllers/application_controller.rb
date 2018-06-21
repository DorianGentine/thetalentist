class ApplicationController < ActionController::Base
  include Pundit

  protect_from_forgery with: :exception

  # TODO modifier authenticate_talent pour tous les users
  before_action :authenticate!
  before_action :current_user

  # Pundit: white-list approach.
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  # Uncomment when you *really understand* Pundit!
  # rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  # def user_not_authorized
  #   flash[:alert] = "You are not authorized to perform this action."
  #   redirect_to(root_path)
  # end

  private

  def authenticate!
   :authenticate_talent! || :authenticate_headhunter! || :authenticate_talentist!
    # @current_user = talent_signed_in? ? current_talent : current_headhunter
    if talent_signed_in?
      @current_user = current_talent
    elsif talentist_signed_in?
      @current_user = current_talentist
    else
      @current_user = current_headhunter
    end
  end

  # def current_user
  #   @current_user
  # end

  # TEST
  def current_user
    if current_talent
      @current_talent
    elsif current_talentist
      @current_talentist
    else
      @current_headhunter
    end
  end
  helper_method :current_user
  #

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end

  def after_sign_in_path_for(resource)
    if resource.is_a?(Headhunter)
      sign_in(resource)
      headhunter_path(resource)
    elsif resource.is_a?(Talent)
      raise
      sign_in(resource)
      talent_path(resource)
    elsif resource.is_a?(Talentist)
      talents_path
    else
      new
    end
  end

  def after_sign_up_path_for(resource)
    if resource.is_a?(Headhunter)
      headhunter_path(Headhunter)
    elsif resource.is_a?(Talent)
      talent_path(resource)
    elsif resource.is_a?(Talentist)
      talents_path
    else
      new
    end
  end
end
