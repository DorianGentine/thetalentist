class TalentSector < ApplicationRecord
  belongs_to :talent
  belongs_to :sector

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :sector, :reject_if => :all_blank
end
