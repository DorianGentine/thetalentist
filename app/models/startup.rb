class Startup < ApplicationRecord
  has_many :headhunters, dependent: :destroy
  accepts_nested_attributes_for :headhunters, allow_destroy: true

  validates :name, presence: true
  validates :link, presence: true

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

end
