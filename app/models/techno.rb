class Techno < ApplicationRecord
  has_many :talent_technos
  has_many :talents, through: :talent_technos


end
