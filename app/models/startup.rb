class Startup < ApplicationRecord
  before_save :upace_name

  scope :with_headhunter, -> { where.not(headhunters: [nil, ""])}
  scope :with_no_headhunter, -> { where(headhunters: [nil, ""]) }

  default_scope {order('name ASC')}



  has_many :headhunters, dependent: :destroy
  accepts_nested_attributes_for :headhunters, allow_destroy: true

  has_many :pictures, dependent: :destroy
  validates_length_of :pictures, maximum: 5
  accepts_nested_attributes_for :pictures, allow_destroy: true

  has_many :startup_sectors, dependent: :destroy
  has_many :sectors, through: :startup_sectors
  accepts_nested_attributes_for :startup_sectors, allow_destroy: true
  accepts_nested_attributes_for :sectors, allow_destroy: true

  has_many :startup_words, dependent: :destroy
  has_many :words, through: :startup_words
  accepts_nested_attributes_for :startup_words, allow_destroy: true
  accepts_nested_attributes_for :words, allow_destroy: true

  validates :name, presence: true, uniqueness: true, if: :checking_name_available?
  # validates :link, presence: true

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  mount_uploader :logo, PhotoUploader
  process_in_background :logo
  # store_in_background :logo

  def checking_name_available?
    if Startup.where(name: self.name).count > 0
      false
    else
      true
    end
  end


  def there_is_no_social_network?
    if self.facebook.nil? && self.linkedin.nil?
      return true
    end
  end
  def upace_name
    self.name = self.name.lstrip.upcase
  end
  def capitalize_name
    self.name = self.name.capitalize
  end
end
