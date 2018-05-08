class CreateTalentJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_jobs do |t|
      t.references :talent, foreign_key: true
      t.references :job, foreign_key: true

      t.timestamps
    end
  end
end
