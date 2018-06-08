class AddPhotoToTalentist < ActiveRecord::Migration[5.2]
  def change
    add_column :talentists, :photo, :string
  end
end
