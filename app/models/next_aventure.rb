class NextAventure < ApplicationRecord
  belongs_to :talent

  validates :city, presence: true
  validates :contrat, presence: true
  validates :remuneration, presence: true

end
