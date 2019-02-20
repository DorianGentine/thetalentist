ActiveAdmin.register Startup do
  # config.sort_order = 'name_asc'
  # config.default_per_page = 100

  scope :all, default: true
  scope :with_headhunter
  scope :with_no_headhunter


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

end
