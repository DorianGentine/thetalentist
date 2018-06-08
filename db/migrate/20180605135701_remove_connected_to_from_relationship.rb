class RemoveConnectedToFromRelationship < ActiveRecord::Migration[5.2]
  def change
    remove_column :relationships, :connected_to, :boolean
  end
end
