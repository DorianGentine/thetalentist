class RemoveZipCodeAndCityFromStartups < ActiveRecord::Migration[5.2]
  def change
    remove_column :startups, :zip_code, :string
    remove_column :startups, :city, :string
  end
end
