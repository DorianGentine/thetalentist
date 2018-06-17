class AddReferencesToExperiences < ActiveRecord::Migration[5.2]
  def change
    add_reference :experiences, :company_type, foreign_key: true
  end
end
