class Pin < ApplicationRecord
  belongs_to :headhunter
  belongs_to :talent

  validates_uniqueness_of :talent_id, scope: :headhunter_id,  :message => "Cette relation existe déjà"

end
