class DropTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :active_admin_comments
  end
end
