class Formation < ApplicationRecord
  has_many :talent_formation, dependent: :destroy
  has_many :talents, through: :talent_formations
end
