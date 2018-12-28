class NextAventure < ApplicationRecord
  belongs_to :talent

  validates :contrat, presence: true
  validates :remuneration, presence: true

  has_many :next_aventure_sectors, dependent: :destroy
  has_many :sectors, through: :next_aventure_sectors

  has_many :mobilities, dependent: :destroy
  accepts_nested_attributes_for :mobilities, allow_destroy: true, reject_if: :all_blank

  # before_save :compile_cities_of_next_aventure

  # before_save { |next_aventure| next_aventure.city = next_aventure.city.join(', ') }

  private

  def compile_cities_of_next_aventure
    return self.city.join(', ')
  end

  def decompile_cities_of_next_aventure
    return self.city.split(",")
  end
end
