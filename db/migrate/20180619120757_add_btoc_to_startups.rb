class AddBtocToStartups < ActiveRecord::Migration[5.2]
  def change
    add_column :startups, :btoc, :boolean
    add_column :startups, :btob, :boolean
  end
end
