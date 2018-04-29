class CreateTalentTechnos < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_technos do |t|
      t.references :techno, foreign_key: true
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
