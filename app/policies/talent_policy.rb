class TalentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve


      if user.is_a?(Talentist) || user.is_a?(Headhunter)
        scope.all.order('created_at DESC')
      else
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
      Relationship.where(talent: record).where(headhunter: user).where(status: "Accepter").first.present?
    elsif user.is_a?(Talent)
      user == record
    elsif user.is_a?(Talentist)
      true
    else
      false
    end
  end

  def info_pdf?
    true
  end

  def update?
    user = record
  end

  def update_photo?
    update?
  end

  def update_profile?
    update?
  end

  def update_experience?
    update?
  end

  def update_next_aventure?
    update?
  end

  def update_formation_and_skill?
    update?
  end

  def repertory?
    user = record
  end

  def validation?
    if user.is_a?(Talentist)
      true
    end
  end

  def visible?
    if user.is_a?(Talentist)
      true
    end
  end
end
