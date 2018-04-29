class Formation < ApplicationRecord
  has_many :talent_formation, dependent: :destroy
end
