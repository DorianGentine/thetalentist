class AddPhotoToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :photo, :string
  end
end
