class ChangeStartigFromExperiences < ActiveRecord::Migration[5.2]
  def change
    remove_column :experiences, :startig, :string
    add_column :experiences, :startig, :string
  end
end
