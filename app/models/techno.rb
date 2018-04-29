class Techno < ApplicationRecord
  has_many :talent_techno, dependent: :destroy
end
