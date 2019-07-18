class ChangeNameToLastNameFromHeadhunters < ActiveRecord::Migration[5.2]
  def change
    rename_column :headhunters, :name, :last_name
  end
end
