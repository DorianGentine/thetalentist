class CreateHeadhunterEmails < ActiveRecord::Migration[5.2]
  def change
    create_table :headhunter_emails do |t|
      t.boolean :newletter
      t.references :headhunter, foreign_key: true

      t.timestamps
    end
  end
end
