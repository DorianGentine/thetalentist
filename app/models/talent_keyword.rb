class TalentKeyword < ApplicationRecord
  belongs_to :talent
  belongs_to :keyword

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :keyword, :reject_if => :all_blank
end
