class CreateTalentKeywords < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_keywords do |t|
      t.references :talent, foreign_key: true
      t.references :keyword, foreign_key: true

      t.timestamps
    end
  end
end
