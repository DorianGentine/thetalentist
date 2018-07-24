class AddCompanyNameToExperience < ActiveRecord::Migration[5.2]
  def change
    add_column :experiences, :company_name, :string
  end
end
