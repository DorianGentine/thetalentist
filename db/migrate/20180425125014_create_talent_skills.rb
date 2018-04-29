class CreateTalentSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_skills do |t|
      t.integer :level
      t.references :talent, foreign_key: true
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
