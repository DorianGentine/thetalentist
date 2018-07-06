class Language < ApplicationRecord
  has_many :talent_languages, dependent: :destroy
  has_many :talents, through: :talent_languages
end
