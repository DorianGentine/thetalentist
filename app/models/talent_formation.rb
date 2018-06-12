class TalentFormation < ApplicationRecord
  belongs_to :talent
  belongs_to :formation

  validates :title, presence: true
  validates :year, presence: true

  accepts_nested_attributes_for :talent, :reject_if => :all_blank, allow_destroy: true
  accepts_nested_attributes_for :formation, :reject_if => :all_blank, allow_destroy: true
end
