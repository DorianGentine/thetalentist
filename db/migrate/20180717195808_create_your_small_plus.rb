class CreateYourSmallPlus < ActiveRecord::Migration[5.2]
  def change
    create_table :your_small_plus do |t|
      t.text :description
      t.references :next_aventure, foreign_key: true

      t.timestamps
    end
  end
end
