class PhotoUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process eager: true  # Force version generation at upload time.

  process convert: 'jpg'

  version :thumnail do
    resize_to_fit 256, 256
  end

  version :bright_face do
    cloudinary_transformation effect: "brightness:30", radius: 50,
      width: 50, height: 50, crop: :thumb, gravity: :face
  end
end
