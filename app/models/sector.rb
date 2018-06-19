class Sector < ApplicationRecord
  has_many :talent_sectors, dependent: :destroy
  has_many :talents, through: :talent_sectors


  has_many :next_aventure_sectors, dependent: :destroy
  has_many :next_aventures, through: :next_aventure_sectors

  has_many :startup_sectors, dependent: :destroy
  has_many :startups, through: :startup_sectors


end
