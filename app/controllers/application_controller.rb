class ApplicationController < ActionController::Base
  include Pundit

  protect_from_forgery with: :exception

  # TODO modifier authenticate_talent pour tous les users
  before_action :authenticate!
  before_action :current_user
  before_action :prise_de_contact, except: :admin

  # Pundit: white-list approach.
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  after_action :set_error_cookies, except: [:error_500, :error_404, :error_422 ]

  # Uncomment when you *really understand* Pundit!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    if params[:controller] == "headhunters" && params[:action] == "repertory"
      redirect_to(new_headhunter_session_path)
    else
      redirect_to(root_path)
    end
  end

  private

  def authenticate!
   :authenticate_talent! || :authenticate_headhunter! || :authenticate_talentist!
    # @current_user = talent_signed_in? ? current_talent : current_headhunter
    if talent_signed_in?
      @current_user = current_talent
    elsif talentist_signed_in?
      @current_user = current_talentist
    elsif headhunter_signed_in?
      @current_user = current_headhunter
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
        # headhunter_path(resource)
        repertoire_path
      end
    elsif resource.is_a?(Talent)
      if resource.next_aventure.present?
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
      # repertoire_path
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

  def create_new_data_with_only_title(params, table_name)
    class_name = table_name.classify.constantize
    words = []
    params.each do |param|
      if param == ""
      elsif param.to_i != 0
        word_id = param
      else
        if class_name.where(title: param.capitalize ).count < 1
          word = class_name.create(title: param.capitalize )
        else
          word = class_name.where(title: param.capitalize ).first
        end
        word_id = word.id.to_s
      end
      if word_id.present?
        words << word_id
      end
    end
    return words
  end

  def set_error_cookies
    if current_user.present?
      if current_user.is_a?(Talent)
        model_user = 'Talent'
      elsif current_user.is_a?(Talentist)
        model_user = 'Talentist'
      else
        model_user = 'Headhunter'
      end
      user_id = current_user.id
    elsif !current_user && @talent || @headhunter || @talentist
      model_user = {
        talent: @talent.class.name,
        headhunter: @headhunter.class.name,
        talentist: @talentist.class.name
      }
      user_id = {
        talent: @talent.nil? ? "Blank" : @talent.id,
        headhunter: @headhunter.nil? ? "Blank" : @headhunter.id,
        talentist: @talentist.nil? ? "Blank" : @talentist.id
      }
    else
      model_user = "Blank"
      user_id = "Blank"
    end

    session[:data_error] = {
      time: Time.now.strftime("%d/%m/%Y a %I:%M%p"),
      path: request.url,
      controller: params[:controller],
      action: params[:action],
      model_user: model_user,
      user_id: user_id
    }
  end

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

end
