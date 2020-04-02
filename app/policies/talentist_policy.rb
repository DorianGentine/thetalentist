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

  def sort?
    true
  end
  def index?
    # scope.where(:id => record.id).exists? && user == record
  end
  def show?
    user == record
  end
  def left?
    true
  end
  def repertoire?
    user == record
  end

  def navbar?
    true
  end

  def analytics?
    user == record
  end

  def all?
    user == record
  end
end
