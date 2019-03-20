class TalentistPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def update?
    user == record
  end

  def repertory?
    user == record
  end

  def index?
    # scope.where(:id => record.id).exists? && user == record
  end
  def show?
    user == record

  end
end
