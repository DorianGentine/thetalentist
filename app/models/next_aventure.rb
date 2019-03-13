class NextAventure < ApplicationRecord
  belongs_to :talent


  validates_presence_of :mobilities, message: "Ajouter un titre"
  validates_presence_of :contrat, message: "Ajoute ton type de contrat"
  validates_presence_of :sector_ids, message: "Ajoute un secteur"


  has_many :next_aventure_sectors, dependent: :destroy
  has_many :sectors, through: :next_aventure_sectors

  has_many :mobilities, dependent: :destroy
  accepts_nested_attributes_for :mobilities, allow_destroy: true, reject_if: :all_blank


  private

  # def compile_cities_of_next_aventure
  #   return self.city.join(', ')
  # end

  # def decompile_cities_of_next_aventure
  #   return self.city.split(",")
  # end
end
