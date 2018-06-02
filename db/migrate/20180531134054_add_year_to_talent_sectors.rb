class AddYearToTalentSectors < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_sectors, :year, :integer
  end
end
