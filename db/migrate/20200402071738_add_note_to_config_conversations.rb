class AddNoteToConfigConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :config_conversations, :note, :text
  end
end
