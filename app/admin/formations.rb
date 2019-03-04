ActiveAdmin.register Formation do

scope :all
scope "Avec Talents", :has_talents, default: true

permit_params :title, :type_of_formation, :ranking

  index do
    selectable_column
    column :id
    column :title
    column :type_of_formation
    column :ranking
    actions
  end

end
