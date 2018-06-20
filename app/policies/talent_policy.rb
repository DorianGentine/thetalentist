class TalentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def new?
    true
  end

  def create?
    true
  end

  def show?
    # record = le talent de la page à afficher
    # user = l'utilisateur connecté
    # 1. est-ce que le talent existe ?
    # 2. soit je suis ce talent
    # scope.where(:id => record.id).exists? && user == record
    # 3. soit je suis un recruteur et je suis connecté au talent
    # user.is_a?(Headhunter) && user.is_connected_to(record)
    true # --> sert ici pour le test / a modifier pour reprendre la logique ci-dessus
  end

  def update?
    true # --> sert ici pour le test / a modifier pour reprendre la logique ci-dessus
  end

  def repertory?
    true
  end

  def to_validate?
    true
  end
end
