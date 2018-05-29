class ChangeColumnInStartups < ActiveRecord::Migration[5.2]
  def change
    rename_column :startups, :year_of_cration, :year_of_creation
  end
end
