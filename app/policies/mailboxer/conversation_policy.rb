class Mailboxer::ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # scope.all
      user.mailbox.conversations.map{|c| c if c.participants.count > 1 }
    end
  end

  def create?
    true
  end

  def update?
    raise
  end


  def show?
    record.participants.include?(user)
  end
end
