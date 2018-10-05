class Startup < ApplicationRecord
  has_many :headhunters, dependent: :destroy
  accepts_nested_attributes_for :headhunters, allow_destroy: true

  has_many :pictures, dependent: :destroy
  accepts_nested_attributes_for :pictures, allow_destroy: true

  has_many :startup_sectors, dependent: :destroy
  has_many :sectors, through: :startup_sectors
  accepts_nested_attributes_for :startup_sectors, allow_destroy: true
  accepts_nested_attributes_for :sectors, allow_destroy: true

  has_many :startup_words, dependent: :destroy
  has_many :words, through: :startup_words
  accepts_nested_attributes_for :startup_words, allow_destroy: true
  accepts_nested_attributes_for :words, allow_destroy: true

  validates :name, presence: true
  validates :link, presence: true

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  mount_uploader :logo, PhotoUploader
  def there_is_no_social_network?
    if self.facebook.nil? && self.linkedin.nil?
      return true
    end
  end
end
