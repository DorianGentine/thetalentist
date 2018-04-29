class CreateTalentLanguages < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_languages do |t|
      t.references :language, foreign_key: true
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
