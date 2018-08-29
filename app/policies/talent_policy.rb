class TalentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.is_a?(Talentist)
        scope.all
      elsif user.is_a?(Talent)
        false
      end
    end
  end

  def new?
    create?
  end

  def create?
    true
  end

  # def show?
  #   # record = le talent de la page à afficher
  #   # user = l'utilisateur connecté
  #   # 1. est-ce que le talent existe ?
  #   # 2. soit je suis ce talent
  #   # scope.where(:id => record.id).exists? && user == record
  #   # 3. soit je suis un recruteur et je suis connecté au talent
  #   # user.is_a?(Headhunter) && user.is_connected_to(record)
  #   true # --> sert ici pour le test / a modifier pour reprendre la logique ci-dessus
  # end

  def show?
    if user.is_a?(Headhunter)
      Relationship.where(talent_id: record.id).where(headhunter_id: user.id).where(status: "accepted").first
    elsif user.is_a?(Talent)
      user == record
    elsif user.is_a?(Talentist)
      true
    else
      false
    end
  end

  def update?
    user = record
  end

  def repertory?
    user = record
  end


  def to_validate?
    if user.is_a?(Talentist)
      true
    else
      false
    end
  end
end
