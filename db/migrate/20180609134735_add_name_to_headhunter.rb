class AddNameToHeadhunter < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :name, :string
  end
end
