class Mailboxer::ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # scope.all
      if user.is_a?(Talentist)
        scope.all.reorder(updated_at: :desc)
      else
        user.mailbox.conversations.reorder(updated_at: :desc)
      end
    end
  end

  def create?
    true
  end



  def show?
    p "policy user is a: #{user}"
    if user.is_a?(Talentist)
      scope.all
    else
      record.participants.include?(user)
    end
  end
end
