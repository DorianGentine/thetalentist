ActiveAdmin.register Startup do


  index do
    selectable_column
    column :id
    column :email
    column :firstname
    column :name
    column :headhunter_ids
    column :created_at
    actions
  end

end
