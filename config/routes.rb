Rails.application.routes.draw do
  devise_for :talentists, path: 'talentists'
  devise_for :headhunters, path: 'headhunters'
  devise_for :talents, path: 'talents', controllers: {
    sessions: 'talents/sessions',
    passwords: 'talents/passwords',
    registrations: 'talents/registrations'
  }
  root to: 'pages#home'
  resources :after_signup
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end


