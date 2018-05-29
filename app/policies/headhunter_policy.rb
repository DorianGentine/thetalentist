class HeadhunterPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show
    true
    # user = l'utilisateur connecté : soit un talent / soit un headhunter / soit un talentist
    # record = un headhunter
    # si le talent est connecté au headhunter alors on veut afficher la page du headhunter

    # user.is_a?(Talent) && user.is_connected_to?(record) --> créer une méthode is_connected_to?(headhunter)
  end

  def repertory
    record.headhunter == headhunter
    true
  end
end
