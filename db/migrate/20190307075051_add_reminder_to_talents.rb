class AddReminderToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :reminder, :string
  end
end
