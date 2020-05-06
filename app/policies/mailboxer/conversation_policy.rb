class Mailboxer::ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # scope.all
      user.mailbox.conversations
    end
  end

  def create?
    true
  end



  def show?
    record.participants.include?(user)
  end
end
