class AddPositionToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :position, :integer
  end
end
