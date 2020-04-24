class AddPhoneToHeadhunters < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :phone, :string
  end
end
