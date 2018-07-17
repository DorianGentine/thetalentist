class AddAvailabilityToNextAventures < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :availability, :string
  end
end
