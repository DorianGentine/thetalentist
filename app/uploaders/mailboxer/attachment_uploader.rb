class Mailboxer::AttachmentUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  storage :file
end
