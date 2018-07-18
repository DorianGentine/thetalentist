class AddDreamAndFamousPersonAndGoodManagerAndWorkForFreeToNextAventure < ActiveRecord::Migration[5.2]
  def change
    add_column :next_aventures, :dream, :text
    add_column :next_aventures, :famous_person, :string
    add_column :next_aventures, :good_manager, :text
    add_column :next_aventures, :work_for_free, :text
  end
end
