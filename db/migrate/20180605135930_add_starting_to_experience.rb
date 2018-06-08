class AddStartingToExperience < ActiveRecord::Migration[5.2]
  def change
    add_column :experiences, :startig, :string
  end
end
