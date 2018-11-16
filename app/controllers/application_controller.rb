class ApplicationController < ActionController::Base
  include Pundit

  protect_from_forgery with: :exception

  # TODO modifier authenticate_talent pour tous les users
  before_action :authenticate!
  before_action :current_user
  before_action :prise_de_contact

  # Pundit: white-list approach.
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  # Uncomment when you *really understand* Pundit!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end

  private

  def authenticate!
   :authenticate_talent! || :authenticate_headhunter! || :authenticate_talentist!
    # @current_user = talent_signed_in? ? current_talent : current_headhunter
    # raise
    if talent_signed_in?
      @current_user = current_talent
    elsif talentist_signed_in?
      @current_user = current_talentist
    elsif headhunter_signed_in?
      @current_user = current_headhunter
    end
  end



  # def current_user
  #   @current_user
  # end
  def prise_de_contact
    @contact = ContactForm.new

    flats = []
    flats << {lat: 48.870129, lng: 2.345335}
    flats << {lat: 48.870129, lng: 2.345335}
    @markers = flats.map do |flat|
         {
        lat: flat[:lat],
        lng: flat[:lng]
        #,
        # infoWindow: { content: render_to_string(partial: "/flats/map_box", locals: { flat: flat }) }
      }
    end
  end
  # TEST
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
  helper_method :current_user
  #

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end

  def after_sign_in_path_for(resource)
    if resource.is_a?(Headhunter)
      if resource.startup.nil?
        session[:headhunter_id] = resource.id
        steps_startup_info_path(:startup)
      else
        sign_in(resource)
        headhunter_path(resource)
      end
    elsif resource.is_a?(Talent)
      if resource.next_aventures.first
        if resource.validated
          sign_in(resource)
          talent_path(resource)
        else
          waiting_for_validation_path
        end
      else
        session[:talent_id] = resource.id
        # steps_talent_info_path(:formations)
        steps_talent_info_path(:user_informations)
      end
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
      if resource.validated
        talent_path(resource)
      else
        waiting_for_validation_path
      end
    elsif resource.is_a?(Talentist)
      talents_path
    else
      new
    end
  end
end
