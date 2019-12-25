class AddSeeMyJobToNextAventures < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :see_my_job, :text
  end
end
