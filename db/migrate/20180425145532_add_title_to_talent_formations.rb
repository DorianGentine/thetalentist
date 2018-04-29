class AddTitleToTalentFormations < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_formations, :title, :string
  end
end
