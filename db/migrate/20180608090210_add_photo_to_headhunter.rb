class AddPhotoToHeadhunter < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :photo, :string
  end
end
