class Keyword < ApplicationRecord
  has_many :talent_keyword, dependent: :destroy
  has_many :talents, through: :talent_keywords
end
