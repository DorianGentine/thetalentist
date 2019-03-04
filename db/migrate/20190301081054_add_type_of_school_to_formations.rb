class AddTypeOfSchoolToFormations < ActiveRecord::Migration[5.2]
  def change
    add_column :formations, :type_of_formation, :string
    add_column :formations, :ranking, :string
  end
end
