class AddTokenToHeadhunters < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :authentication_token, :string, limit: 30
    add_index :headhunters, :authentication_token, unique: true
  end
end
