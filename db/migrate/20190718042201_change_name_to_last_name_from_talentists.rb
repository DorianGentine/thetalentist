class ChangeNameToLastNameFromTalentists < ActiveRecord::Migration[5.2]
  def change
    rename_column :talentists, :name, :last_name
  end
end
