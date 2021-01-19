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

  def sort?
    true
  end
  def refused?
    true
  end

  def left?
    true
  end

  def navbar?
    true
  end

  def show?
    if user.is_a?(Headhunter)
      relationship = Relationship.find_by(
        talent: record,
        headhunter: user,
        status: Relationship::STATUS_TYPE_ACCEPT
      )
      return true unless relationship.nil?

      ViewInteraction.find_by(talent: record, headhunter: user).present?
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
    # test = Talent.find(38)
    # test == record
    user == record
  end

  def update_avatar?
    update?
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
