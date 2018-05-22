class AddStartingToExperiences < ActiveRecord::Migration[5.2]
  def change
    add_column :experiences, :starting, :datetime
  end
end
