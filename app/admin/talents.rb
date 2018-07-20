ActiveAdmin.register Talent do

  index do
    selectable_column
    column :id
    column :email
    column :firstname
    column :name
    column :sector_ids
    column :created_at
    actions
  end

end
