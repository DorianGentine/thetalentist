class CreateTalentFormations < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_formations do |t|
      t.integer :year
      t.references :talent, foreign_key: true
      t.references :formation, foreign_key: true

      t.timestamps
    end
  end
end
