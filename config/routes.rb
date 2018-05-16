Rails.application.routes.draw do
  devise_for :talentists, path: 'talentists'

  devise_for :headhunters, path: 'headhunters', controllers: {
    sessions: 'headhunters/sessions',
    passwords: 'headhunters/passwords',
    registrations: 'headhunters/registrations'
  }



  resources :headhunters, only: [:show, :update]
  # show is to display the profil and update to edit it
  # le repertoire est la où on affiche tous les talents
  get 'repertoire', to: "headhunters#repertory"


  devise_for :talents, path: 'talents', controllers: {
    sessions: 'talents/sessions',
    passwords: 'talents/passwords',
    registrations: 'talents/registrations'
  }
  root to: 'pages#home'
  resources :steps_talent_infos
  resources :steps_startup_infos
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end


