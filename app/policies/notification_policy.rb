class NotificationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all if user.is_a?(Talentist)
    end
  end
end
