class Mailboxer::AttachmentUploader < CarrierWave::Uploader::Base
  # Option 1 sans Cloudinary
  # Commenter la ligne ci-dessous si l'on veut utiliser Cloudinary
  # storage :file # avec cette option, les fichiers uploadés sont enregistrés dans le dossier public/uploads

  # Option 2 avec Cloudinary
  include Cloudinary::CarrierWave
end
