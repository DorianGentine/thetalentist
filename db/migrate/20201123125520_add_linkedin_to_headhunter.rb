class AddLinkedinToHeadhunter < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :linkedin, :string
  end
end
