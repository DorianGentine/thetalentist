class AddFilesToConfigConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :config_conversations, :files, :string
  end
end
