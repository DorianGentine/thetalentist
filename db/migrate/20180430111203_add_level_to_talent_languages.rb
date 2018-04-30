class AddLevelToTalentLanguages < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_languages, :level, :integer
  end
end
