class CreateTalentHobbies < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_hobbies do |t|
      t.references :talent, foreign_key: true
      t.references :hobby, foreign_key: true

      t.timestamps
    end
  end
end

