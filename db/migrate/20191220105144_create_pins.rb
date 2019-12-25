class CreatePins < ActiveRecord::Migration[5.2]
  def change
    create_table :pins do |t|
      t.references :headhunter, foreign_key: true
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
