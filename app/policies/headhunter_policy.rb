class HeadhunterPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.is_a?(Talentist)
        scope.all.order('created_at DESC')
      elsif user.is_a?(Headhunter)
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

  def update?
    user == record || user.is_a?(Talentist)
  end

  def destroy?
    user == record || user.is_a?(Talentist)
  end

  def edit?
    user == record || user.is_a?(Talentist)
  end

  def update_profile?
    update?
  end


  def navbar?
    true
  end

  def update_photos?
    update?
  end

  def update_startup?
    update?
  end
  def left?
    true
  end
  def show?
    if user.is_a?(Talent)
      Relationship.where(talent_id: user.id).where(headhunter_id: record.id).where(status: "accepted").first
      true
    elsif user.is_a?(Headhunter)
      user == record
    elsif user.is_a?(Talentist)
      true
    else
      false
    end
    # user = l'utilisateur connecté : soit un talent / soit un headhunter / soit un talentist
    # record = un headhunter
    # si le talent est connecté au headhunter alors on veut afficher la page du headhunter

    # user.is_a?(Talent) && user.is_connected_to?(record) --> créer une méthode is_connected_to?(headhunter)
  end

  def conversations?
    true
  end

  def set_conversation?
    true
  end

  def to_validate?
    if user.is_a?(Talentist)
      true
    else
      false
    end
  end

  def repertoire?
    user == record
  end
  def repertoire_pagy?
    user == record
  end

  def repertory?
    user == record
  end
end
