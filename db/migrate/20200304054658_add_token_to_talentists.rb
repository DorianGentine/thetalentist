class AddTokenToTalentists < ActiveRecord::Migration[5.2]
  def change
    add_column :talentists, :authentication_token, :string, limit: 30
    add_index :talentists, :authentication_token, unique: true
  end
end
