ActiveAdmin.register Talent do
  permit_params :name,
                :firstname,
                :linkedin


  index do
    selectable_column
    column :email
    column :firstname
    column :name
    column :linkedin
    # column( "1er Metier", nil, sortable: :"jobs.title") {|talent| talent.jobs.first.title }
    column :created_at
    actions
  end


  form do |f|
    f.inputs :name
    f.inputs :firstname
    f.inputs :linkedin
    f.actions
  end
end
