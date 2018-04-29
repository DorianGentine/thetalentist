class Skill < ApplicationRecord
  has_many :talent_skill, dependent: :destroy
end
