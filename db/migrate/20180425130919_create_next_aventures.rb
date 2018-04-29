class CreateNextAventures < ActiveRecord::Migration[5.2]
  def change
    create_table :next_aventures do |t|
      t.string :city
      t.string :contrat
      t.string :remuneration
      t.text :overview
      t.text :no_more
      t.text :why_leaving
      t.text :last_words
      t.boolean :available
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
