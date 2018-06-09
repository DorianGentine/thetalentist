class TalentistPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
    scope.where(:id => record.id).exists? && user == record
  end
end
