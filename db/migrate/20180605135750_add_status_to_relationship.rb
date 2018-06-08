class AddStatusToRelationship < ActiveRecord::Migration[5.2]
  def change
    add_column :relationships, :status, :string
  end
end
