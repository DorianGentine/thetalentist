class AddConditionsToTalent < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :terms_of_condition, :boolean, null: false, default: false
  end
end
