class TalentFormation < ApplicationRecord
  belongs_to :talent
  belongs_to :formation

  validates :title, presence: true
  validates :year, presence: true

end
