class Startup < ApplicationRecord
  has_many :headhunters, dependent: :destroy

  validates :name, presence: true
  validates :overview, presence: true
  validates :link, presence: true
  validates :city, presence: true

end
