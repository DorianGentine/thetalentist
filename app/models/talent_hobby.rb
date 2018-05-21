class TalentHobby < ApplicationRecord
  belongs_to :hobby
  belongs_to :talent

  accepts_nested_attributes_for :hobby

end
