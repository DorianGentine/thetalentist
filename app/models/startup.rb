class Startup < ApplicationRecord
  has_many :headhunters, dependent: :destroy
  accepts_nested_attributes_for :headhunters, allow_destroy: true

  validates :name, presence: true
  validates :overview, presence: true
  validates :link, presence: true
  validates :city, presence: true

end
