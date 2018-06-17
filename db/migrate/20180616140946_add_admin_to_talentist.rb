class AddAdminToTalentist < ActiveRecord::Migration[5.2]
  def change
    add_column :talentists, :admin, :boolean, null: false, default: false
  end
end
