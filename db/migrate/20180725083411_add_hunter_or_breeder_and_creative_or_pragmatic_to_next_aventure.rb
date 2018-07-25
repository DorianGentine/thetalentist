class AddHunterOrBreederAndCreativeOrPragmaticToNextAventure < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :hunter_or_breeder, :integer
    add_column :next_aventures, :creative_or_pragmatic, :integer
  end
end
