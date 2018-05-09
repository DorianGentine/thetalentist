class Techno < ApplicationRecord
  has_many :talent_techno, dependent: :destroy
  has_many :talents, through: :talent_technos
end
