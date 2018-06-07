class ChangeStartingFromExperiences < ActiveRecord::Migration[5.2]
  def change
    remove_column :experiences, :startig, :string
    add_column :experiences, :starting, :string
  end
end
