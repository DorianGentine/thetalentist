class TalentHobby < ApplicationRecord
  belongs_to :hobby
  belongs_to :talent

  accepts_nested_attributes_for :hobby, :reject_if => :all_blank
  accepts_nested_attributes_for :talent, :reject_if => :all_blank

end
