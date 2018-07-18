class NextAventure < ApplicationRecord
  belongs_to :talent

  validates :city, presence: true
  validates :contrat, presence: true
  validates :remuneration, presence: true

  has_many :next_aventure_sectors, dependent: :destroy
  has_many :sectors, through: :next_aventure_sectors

  has_many :your_small_plus, dependent: :destroy
  accepts_nested_attributes_for :your_small_plus, allow_destroy: true, reject_if: :all_blank


end
