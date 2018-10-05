class AddForeignKeyToYourSmallPlu < ActiveRecord::Migration[5.2]
  def change
    add_reference :your_small_plus, :talent, foreign_key: true
  end
end
