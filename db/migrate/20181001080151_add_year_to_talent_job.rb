class AddYearToTalentJob < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_jobs, :year, :integer
  end
end
