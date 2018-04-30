class CreateStartups < ActiveRecord::Migration[5.2]
  def change
    create_table :startups do |t|
      t.string :name
      t.text :overview
      t.integer :year_of_cration
      t.integer :collaborators
      t.integer :parity
      t.integer :average_age
      t.integer :turnover
      t.string :link
      t.string :address
      t.string :zip_code
      t.string :city

      t.timestamps
    end
  end
end
