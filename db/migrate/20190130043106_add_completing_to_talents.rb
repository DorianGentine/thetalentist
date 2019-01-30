class AddCompletingToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :completing, :integer
  end
end
