class Sector < ApplicationRecord
  has_many :talent_sector, dependent: :destroy
end
