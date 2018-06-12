class TalentKnown < ApplicationRecord
  belongs_to :known
  belongs_to :talent

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :known, :reject_if => :all_blank
end
