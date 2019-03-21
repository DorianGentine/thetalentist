class ChangeDisplayLinkedinPitcureToDisplayLinkedinPicture < ActiveRecord::Migration[5.2]
  def change
    rename_column :talents, :display_linkedin_pitcure, :display_linkedin_picture
  end
end
