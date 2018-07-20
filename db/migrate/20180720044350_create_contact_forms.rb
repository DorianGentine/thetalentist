class CreateContactForms < ActiveRecord::Migration[5.2]
  def change
    create_table :contact_forms do |t|
      t.string :email
      t.string :name
      t.text :message
      t.string :phone
      t.string :subject

      t.timestamps
    end
  end
end
