class PhotoUploader < CarrierWave::Uploader::Base
  include ::CarrierWave::Backgrounder::Delay
  include Cloudinary::CarrierWave
  include CarrierWave::MiniMagick

  process eager: true

  process convert: 'jpg'


  version :big_picture do
    cloudinary_transformation effect: "brightness:10", width: 500, height: 300, crop: :thumb
  end

  version :big_bright_face do
    cloudinary_transformation effect: "brightness:20", radius: 50, :zoom=>0.6,
      width: 200, height: 200, crop: :thumb, gravity: :face
  end

    version :small_bright_face do
    cloudinary_transformation effect: "brightness:20", radius: 50, :zoom=>0.7,
      width: 100, height: 100, crop: :thumb, gravity: :face
  end

end
