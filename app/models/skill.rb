class Skill < ApplicationRecord
  has_many :talent_skills, dependent: :destroy
  has_many :talents, through: :talent_skills
  accepts_nested_attributes_for :talent_skills, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :talents, allow_destroy: true, reject_if: :all_blank
end
