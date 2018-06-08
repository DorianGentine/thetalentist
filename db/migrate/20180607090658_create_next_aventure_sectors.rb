class CreateNextAventureSectors < ActiveRecord::Migration[5.2]
  def change
    create_table :next_aventure_sectors do |t|
      t.references :next_aventure, foreign_key: true
      t.references :sector, foreign_key: true

      t.timestamps
    end
  end
end
