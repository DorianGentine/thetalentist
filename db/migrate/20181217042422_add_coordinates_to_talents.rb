class AddCoordinatesToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :latitude, :float
    add_column :talents, :longitude, :float
  end
end
