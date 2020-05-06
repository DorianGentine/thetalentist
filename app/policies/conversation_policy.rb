class ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # scope.all
      raise
      user.mailbox.conversations
    end
  end

  def create?
    true
  end

  def show?
   raise
  end
end
