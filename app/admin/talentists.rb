ActiveAdmin.register Talentist do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :email, :firstname, :admin, :photo, :last_name
#
# or
#
  index do
    selectable_column
    column :id
    column :email
    column :firstname
    column :last_name
    column :admin
    column :created_at
    actions
  end


  form(:html => { :multipart => true }) do |f|
    f.inputs "Identity" do
      f.input :email
      f.input :last_name
      f.input :firstname
      f.input :photo, :as => :file
    end
    f.inputs "Admin" do
      f.input :admin
    end
    f.actions
  end

# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
