class Language < ApplicationRecord
  has_many :talent_language, dependent: :destroy
  has_many :talents, through: :talent_languages
end
