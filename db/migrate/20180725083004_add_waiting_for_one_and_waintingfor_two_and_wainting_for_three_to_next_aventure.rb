class AddWaitingForOneAndWaintingforTwoAndWaintingForThreeToNextAventure < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :waiting_for_one, :string
    add_column :next_aventures, :waiting_for_two, :string
    add_column :next_aventures, :waiting_for_three, :string
  end
end
