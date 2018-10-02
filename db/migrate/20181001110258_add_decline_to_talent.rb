class AddDeclineToTalent < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :declined, :string
  end
end
