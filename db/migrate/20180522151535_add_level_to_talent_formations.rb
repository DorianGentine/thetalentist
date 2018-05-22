class AddLevelToTalentFormations < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_formations, :level, :string
  end
end
