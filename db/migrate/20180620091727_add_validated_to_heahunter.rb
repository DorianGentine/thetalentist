class AddValidatedToHeahunter < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :validated, :boolean, default: false, null: false
  end
end
