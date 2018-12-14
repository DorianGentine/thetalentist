class CreateMobilities < ActiveRecord::Migration[5.2]
  def change
    create_table :mobilities do |t|
      t.string :title
      t.references :next_aventure, foreign_key: true

      t.timestamps
    end
  end
end
