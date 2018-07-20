ActiveAdmin.register Headhunter do

  index do
    selectable_column
    column :id
    column :email
    column :firstname
    column :name
    column :startup
    column :created_at
    actions
  end


end
