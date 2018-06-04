class RelationshipPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index
    # ??????????? TODO
  end

  def show?
    true
  end
end
