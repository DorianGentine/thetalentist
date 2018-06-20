class RemoveValidetedAndValidatedFromHeadhunter < ActiveRecord::Migration[5.2]
  def change
    remove_column :headhunters, :valideted, :boolean
    remove_column :headhunters, :validated, :boolean
  end
end
