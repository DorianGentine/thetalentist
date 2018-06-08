class NextAventure < ApplicationRecord
  belongs_to :talent

  validates :city, presence: true
  validates :contrat, presence: true
  validates :remuneration, presence: true

  has_many :next_aventure_sectors, dependent: :destroy
  has_many :sectors, through: :next_aventure_sectors


end
