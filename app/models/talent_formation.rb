class TalentFormation < ApplicationRecord
  belongs_to :talent
  belongs_to :formation

  validates_presence_of :title, message: "Information obligatoire"
  validates_presence_of :year, message: "Ajouter l'année d'obtention"

  default_scope { order(year: :DESC) }

  accepts_nested_attributes_for :talent, :reject_if => :all_blank, allow_destroy: true
  accepts_nested_attributes_for :formation, :reject_if => :all_blank, allow_destroy: true
end
