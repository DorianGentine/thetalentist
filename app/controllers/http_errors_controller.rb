class HttpErrorsController < ApplicationController

  skip_after_action :verify_policy_scoped, :only => [:error_500, :error_404, :error_422 ]
  skip_after_action :verify_authorized, :only => [:error_500, :error_404, :error_422 ]

  def error_404
    @not_found_path = params[:not_found]
  end

  def error_422
    render(:status => 422)
  end

  def error_500
    render(:status => 500)
  end
end
