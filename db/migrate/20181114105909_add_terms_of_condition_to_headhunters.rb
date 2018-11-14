class AddTermsOfConditionToHeadhunters < ActiveRecord::Migration[5.2]
  def change
    add_column :headhunters, :terms_of_condition, :boolean, null: false, default: false
  end
end
