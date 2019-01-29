class CompanyType < ApplicationRecord

  has_many :experiences, dependent: :destroy
  has_many :talents, through: :experiences
  accepts_nested_attributes_for :experiences, allow_destroy: true, reject_if: :all_blank
  # accepts_nested_attributes_for :talents, allow_destroy: true, reject_if: :all_blank

  validates :title, uniqueness: true

end
