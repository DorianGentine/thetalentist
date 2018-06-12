class TalentSkill < ApplicationRecord
  belongs_to :talent
  belongs_to :skill

  accepts_nested_attributes_for :skill, :reject_if => :all_blank
  accepts_nested_attributes_for :talent, :reject_if => :all_blank
end
