class Sector < ApplicationRecord
  has_many :talent_sectors, dependent: :destroy
  has_many :talents, through: :talent_sectors
end
