class Keyword < ApplicationRecord
  has_many :talent_keyword, dependent: :destroy
end
