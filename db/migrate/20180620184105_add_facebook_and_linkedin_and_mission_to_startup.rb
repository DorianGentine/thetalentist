class AddFacebookAndLinkedinAndMissionToStartup < ActiveRecord::Migration[5.2]
  def change
    add_column :startups, :facebook, :string
    add_column :startups, :linkedin, :string
    add_column :startups, :mission, :string
  end
end
