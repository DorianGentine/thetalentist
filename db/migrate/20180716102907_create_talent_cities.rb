class CreateTalentCities < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_cities do |t|
      t.references :talent, foreign_key: true
      t.references :city, foreign_key: true

      t.timestamps
    end
  end
end
