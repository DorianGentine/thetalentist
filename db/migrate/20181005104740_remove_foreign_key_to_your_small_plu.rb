class RemoveForeignKeyToYourSmallPlu < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :your_small_plus, :next_aventures
  end
end
