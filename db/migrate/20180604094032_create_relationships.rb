class CreateRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :relationships do |t|
      t.boolean :connected_to
      t.references :talent, foreign_key: true
      t.references :headhunter, foreign_key: true

      t.timestamps
    end
  end
end
