class CreateConfigConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :config_conversations do |t|
      t.integer :conversation_id
      t.integer :user_id
      t.string :user_email
      t.boolean :pin
      t.boolean :archived

      t.timestamps
    end
  end
end
