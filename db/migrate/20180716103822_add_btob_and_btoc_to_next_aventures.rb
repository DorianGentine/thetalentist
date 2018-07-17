class AddBtobAndBtocToNextAventures < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :btob, :boolean, null: false, default: false
    add_column :next_aventures, :btoc, :boolean, null: false, default: false
  end
end
