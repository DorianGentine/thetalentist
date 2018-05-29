class AddCoordinatesToStartups < ActiveRecord::Migration[5.2]
  def change
    add_column :startups, :latitude, :float
    add_column :startups, :longitude, :float
  end
end
