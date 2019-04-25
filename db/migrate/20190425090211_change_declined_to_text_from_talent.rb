class ChangeDeclinedToTextFromTalent < ActiveRecord::Migration[5.2]
  def change
    change_column :talents, :declined, :text
  end
end
