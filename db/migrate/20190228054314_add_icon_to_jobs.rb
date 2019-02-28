class AddIconToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :icon, :string
  end
end
