class HttpErrorsController < ApplicationController

  skip_after_action :verify_policy_scoped, :only => [:error_500, :error_404, :error_422 ]
  skip_after_action :verify_authorized, :only => [:error_500, :error_404, :error_422 ]
  before_action :store_location, only: [ :error_500 ]

  def error_404
    @error_datas = session[:data_error]
    set_email_error("error_404", @error_datas)
    @not_found_path = params[:not_found]
  end

  def error_422
    @error_datas = session[:data_error]
    set_email_error("error_422", @error_datas)
    render(:status => 422)
  end

  def error_500
    @error_datas = session[:data_error]
    set_email_error("error_500", @error_datas)
    render(:status => 500)
  end
  def store_location
    # session[‘saved_location’] = request.request_uri
  end

  private

  def set_email_error(current_page, type_erreur)
    # ApplicationMailer.erreur_message(current_page, type_erreur).deliver_later
  end

  # def set_errors_infos
  #   error_datas = session[:data_error]
  # end
end
