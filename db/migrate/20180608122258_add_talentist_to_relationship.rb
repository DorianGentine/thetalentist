class AddTalentistToRelationship < ActiveRecord::Migration[5.2]
  def change
    add_reference :relationships, :talentist, foreign_key: true
  end
end
