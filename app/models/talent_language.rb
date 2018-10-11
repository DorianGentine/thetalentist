class TalentLanguage < ApplicationRecord
  belongs_to :language
  belongs_to :talent

  accepts_nested_attributes_for :talent, :reject_if => :all_blank

  enum level: { Notions: 1, "lu parlé écrit" => 2, "Avancée" => 3, Bilingue: 4, Natif: 5}

end
