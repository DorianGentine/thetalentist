class Picture < ApplicationRecord
  belongs_to :startup

  mount_uploader :photo, PhotoUploader


end
