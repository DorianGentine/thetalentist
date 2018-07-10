class AddShortResumeToStartup < ActiveRecord::Migration[5.2]
  def change
    add_column :startups, :short_resume, :string
  end
end
