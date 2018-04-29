class CreateTalentKnowns < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_knowns do |t|
      t.references :known, foreign_key: true
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
