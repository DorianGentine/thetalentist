class StepsTalentInfosPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    true
  end

  def update?
    # définir qui a le droit d'updater
    # user = l'utilisateur connecté
    # record = le talent
    user == record
  end

end
