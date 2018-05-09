class Known < ApplicationRecord
  has_many :talent_known, dependent: :destroy
  has_many :talents, through: :talent_knowns
end
