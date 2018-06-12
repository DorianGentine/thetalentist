class TalentTechno < ApplicationRecord
  belongs_to :techno
  belongs_to :talent

  accepts_nested_attributes_for :techno, :reject_if => :all_blank
  accepts_nested_attributes_for :talent, :reject_if => :all_blank
end
