class AddValidatedToStartups < ActiveRecord::Migration[5.2]
  def change
    add_column :startups, :validated, :boolean, null: false, default:false
  end
end
