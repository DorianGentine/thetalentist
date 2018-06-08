class Relationship < ApplicationRecord
  belongs_to :talent, optional: true
  belongs_to :headhunter, optional: true
  belongs_to :talentist, optional: true
end
