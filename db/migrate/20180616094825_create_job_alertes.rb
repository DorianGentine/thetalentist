class CreateJobAlertes < ActiveRecord::Migration[5.2]
  def change
    create_table :job_alertes do |t|
      t.references :headhunter, foreign_key: true
      t.references :job, foreign_key: true

      t.timestamps
    end
  end
end
