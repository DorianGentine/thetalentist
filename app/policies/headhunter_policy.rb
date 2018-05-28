class HeadhunterPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end



  def repertory
    record.headhunter == headhunter
    true
  end
end
