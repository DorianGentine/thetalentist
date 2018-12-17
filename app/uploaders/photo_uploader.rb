class PhotoUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process eager: true

  process convert: 'jpg'


  version :bright_face do
    cloudinary_transformation radius: 50,
      width: 50, height: 50, crop: :thumb, gravity: :face
  end
end
