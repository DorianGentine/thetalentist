class RelationshipPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end


  def create?
    # record.headhunter_id = user.id
    true
  end
end
