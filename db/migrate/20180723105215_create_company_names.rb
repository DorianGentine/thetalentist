class CreateCompanyNames < ActiveRecord::Migration[5.2]
  def change
    create_table :company_names do |t|
      t.string :title
      t.timestamps
    end
  end
end
