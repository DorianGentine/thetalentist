class AddDisplayLinkedinPictureToTalents < ActiveRecord::Migration[5.2]
  def change
    add_column :talents, :display_linkedin_pitcure, :boolean, default: true
  end
end
