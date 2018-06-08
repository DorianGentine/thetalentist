class CreateHeadhunterMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :headhunter_messages do |t|
      t.text :content
      t.boolean :is_read
      t.references :headhunter, foreign_key: true
      t.references :relationship, foreign_key: true

      t.timestamps
    end
  end
end
