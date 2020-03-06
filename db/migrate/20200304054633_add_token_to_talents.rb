class AddTokenToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :authentication_token, :string, limit: 30
    add_index :talents, :authentication_token, unique: true
  end
end
