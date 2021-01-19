class CreateViewInteractions < ActiveRecord::Migration[5.2]
  def change
    create_table :view_interactions do |t|
      t.references(:talent, foreign_key: true)
      t.references(:headhunter, foreign_key: true)

      t.timestamps
    end

    add_index(:view_interactions, %i[talent_id headhunter_id], unique: true)
  end
end
