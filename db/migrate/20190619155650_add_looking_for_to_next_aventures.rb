class AddLookingForToNextAventures < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :looking_for, :text
  end
end
