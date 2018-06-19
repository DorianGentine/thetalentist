class Word < ApplicationRecord

  has_many :startup_words, dependent: :destroy
  has_many :startups, through: :startup_words

  accepts_nested_attributes_for :startup_words, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :startups, allow_destroy: true, reject_if: :all_blank
end
