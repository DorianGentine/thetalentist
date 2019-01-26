class AddPhotoTmpToPictures < ActiveRecord::Migration[5.2]
  def change
    add_column :pictures, :photo_tmp, :string
  end
end
