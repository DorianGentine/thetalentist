ActiveAdmin.register Startup do
  # config.sort_order = 'name_asc'
  # config.default_per_page = 100

  scope :all, default: true
  scope :with_headhunter
  scope :with_no_headhunter

  permit_params :name, :overview, :year_of_creation, :collaborators, :parity, :average_age, :turnover, :link, :address, :logo, :btoc, :btob, :linkedin, :mission, :short_resume
  index do
    selectable_column
    column :id
    column :name
    column 'Recruteur', sortable: :headhunter_ids do |startup|
      startup.headhunter_ids.each do |headhunter_id|
        Headhunter.find(headhunter_id).name
      end
    end
    column :created_at
    actions
  end

  form title: "Ajouter une nouvelle Startup" do |f|
    inputs 'Details' do
      input :name
      input :link
      input :logo
      input :linkedin
      input :year_of_creation
      input :mission
    end
    actions
  end

end
