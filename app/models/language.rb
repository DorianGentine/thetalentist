class Language < ApplicationRecord
  has_many :talent_language, dependent: :destroy
end
