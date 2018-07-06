class Techno < ApplicationRecord
  has_many :talent_technos, dependent: :destroy
  has_many :talents, through: :talent_technos
end
