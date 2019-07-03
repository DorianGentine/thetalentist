class ChangeCvToZipCodeFromTalents < ActiveRecord::Migration[5.2]
  def change
    rename_column :talents, :cv, :zip_code
  end
end
