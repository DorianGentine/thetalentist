class CreateStartupSectors < ActiveRecord::Migration[5.2]
  def change
    create_table :startup_sectors do |t|
      t.references :startup, foreign_key: true
      t.references :sector, foreign_key: true

      t.timestamps
    end
  end
end
