class AddTypeOfFormationToTalentFormations < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_formations, :type_of_formation, :string
  end
end
