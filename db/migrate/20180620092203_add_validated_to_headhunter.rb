class AddValidatedToHeadhunter < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :validated, :boolean
  end
end
