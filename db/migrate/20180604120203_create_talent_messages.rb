class CreateTalentMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :talent_messages do |t|
      t.text :content
      t.boolean :is_read
      t.references :talent, foreign_key: true
      t.references :relationship, foreign_key: true

      t.timestamps
    end
  end
end
