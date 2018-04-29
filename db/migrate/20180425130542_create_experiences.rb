class CreateExperiences < ActiveRecord::Migration[5.2]
  def change
    create_table :experiences do |t|
      t.string :position
      t.string :company_name
      t.string :link
      t.string :overview
      t.string :years
      t.boolean :currently
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
