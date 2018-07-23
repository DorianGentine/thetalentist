class RemoveCompanyNameToExperience < ActiveRecord::Migration[5.2]
  def change
    remove_column :experiences, :company_name, :string
  end
end
