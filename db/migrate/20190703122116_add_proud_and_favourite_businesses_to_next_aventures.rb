class AddProudAndFavouriteBusinessesToNextAventures < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :proud, :text
    add_column :next_aventures, :favourite_businesses, :text
  end
end
