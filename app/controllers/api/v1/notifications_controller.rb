class Api::V1::NotificationsController < Api::V1::BaseController

  def index
    @notifications = policy_scope(Notification)
  end

end
