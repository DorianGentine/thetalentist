class DropCompanyNames < ActiveRecord::Migration[5.2]
  def change
    drop_table :company_names
  end
end
