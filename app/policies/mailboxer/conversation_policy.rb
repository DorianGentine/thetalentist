class Mailboxer::ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      p "coucou"
      scope.all
    end
  end

  def index?
    true
  end

  def create?
    true
  end

  def update?
    true
  end


  def show?
    true
  end
end
