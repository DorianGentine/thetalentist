class CreateKnowns < ActiveRecord::Migration[5.2]
  def change
    create_table :knowns do |t|
      t.string :title

      t.timestamps
    end
  end
end
