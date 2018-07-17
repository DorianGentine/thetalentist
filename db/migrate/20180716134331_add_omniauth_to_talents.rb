class AddOmniauthToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :provider, :string
    add_column :talents, :uid, :string
    add_column :talents, :linkedin_picture_url, :string
    add_column :talents, :token, :string
    add_column :talents, :token_expiry, :datetime
  end
end
