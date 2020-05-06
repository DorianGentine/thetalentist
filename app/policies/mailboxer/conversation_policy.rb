class Mailboxer::ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # scope.all
      if user.is_a?(Talentist)
        scope.all
      else
        user.mailbox.conversations
      end
    end
  end

  def create?
    true
  end



  def show?
    record.participants.include?(user)
  end
end
