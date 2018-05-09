class Skill < ApplicationRecord
  has_many :talent_skill, dependent: :destroy
  has_many :talents, through: :talent_skills
end
