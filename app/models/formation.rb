class Formation < ApplicationRecord
  has_many :talent_formations, dependent: :destroy
  has_many :talents, through: :talent_formations
  accepts_nested_attributes_for :talent_formations, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :talents, allow_destroy: true, reject_if: :all_blank
end
