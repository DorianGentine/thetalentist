class CreateStartupWords < ActiveRecord::Migration[5.2]
  def change
    create_table :startup_words do |t|
      t.references :startup, foreign_key: true
      t.references :word, foreign_key: true

      t.timestamps
    end
  end
end
