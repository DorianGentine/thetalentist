Rails.application.routes.draw do
  devise_for :headhunters
  devise_for :talents
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
