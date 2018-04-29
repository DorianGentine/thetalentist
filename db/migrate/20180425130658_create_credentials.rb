class CreateCredentials < ActiveRecord::Migration[5.2]
  def change
    create_table :credentials do |t|
      t.string :firstname
      t.string :company_name
      t.string :name
      t.string :phone
      t.string :email
      t.references :talent, foreign_key: true

      t.timestamps
    end
  end
end
