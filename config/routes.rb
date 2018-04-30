Rails.application.routes.draw do
  devise_for :talentists, path: 'talentists'
  devise_for :headhunters, path: 'headhunters'
  devise_for :talents, path: 'talents'
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
