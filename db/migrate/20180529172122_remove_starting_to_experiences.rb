class RemoveStartingToExperiences < ActiveRecord::Migration[5.2]
  def change
    remove_column :experiences, :starting, :string
  end
end
