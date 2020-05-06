class ChangeFilesToFileToConfigConversations < ActiveRecord::Migration[5.2]
  def change
    rename_column :config_conversations, :files, :file
  end
end
