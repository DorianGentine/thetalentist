class ChangeNameToLastNameFromTalents < ActiveRecord::Migration[5.2]
  def change
    rename_column :talents, :name, :last_name
  end
end
