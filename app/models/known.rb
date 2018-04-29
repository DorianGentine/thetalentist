class Known < ApplicationRecord
  has_many :talent_known, dependent: :destroy
end
