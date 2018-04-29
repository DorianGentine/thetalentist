class CreateTalentSectors < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_sectors do |t|
      t.references :talent, foreign_key: true
      t.references :sector, foreign_key: true

      t.timestamps
    end
  end
end
