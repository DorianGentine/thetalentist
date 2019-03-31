class AddConversationToRelationShips < ActiveRecord::Migration[5.2]
  def change
    add_column :relationships, :conversation_id, :integer
  end
end
