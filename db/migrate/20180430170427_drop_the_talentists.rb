class DropTheTalentists < ActiveRecord::Migration[5.2]
  def change
    drop_table :the_talentists
  end
end
