class AddPhotoToStartups < ActiveRecord::Migration[5.2]
  def change
    add_column :startups, :photo, :string
    add_column :startups, :logo, :string
  end
end
