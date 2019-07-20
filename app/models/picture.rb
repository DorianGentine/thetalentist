class Picture < ApplicationRecord
  belongs_to :startup

  mount_uploader :photo, PhotoUploader
  # process_in_background :photo


end
