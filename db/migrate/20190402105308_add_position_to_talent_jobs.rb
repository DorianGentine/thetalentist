class AddPositionToTalentJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :talent_jobs, :position, :integer
  end
end
