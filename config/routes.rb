Rails.application.routes.draw do

  devise_for :talentists, path: 'talentists'

  devise_for :headhunters, path: 'headhunters', controllers: {
    sessions: 'headhunters/sessions',
    passwords: 'headhunters/passwords',
    registrations: 'headhunters/registrations'
  }
  resources :startups, only: [ :update ]
  resources :headhunters, only: [:show, :update, :index] do
    patch 'to_validate', :on => :member
  end
  # show is to display the profil and update to edit it
  # le repertoire est la où on affiche tous les talents

  get 'repertoire', to: "headhunters#repertory"
  put 'repertoire', to: "headhunters#update"


  devise_for :talents, path: 'talents', controllers: {
    sessions: 'talents/sessions',
    passwords: 'talents/passwords',
    registrations: 'talents/registrations'
  }

  resources :relationships, only: [ :create ]

  resources :talents, only: [:show, :update, :index] do
    patch 'to_validate', :on => :member
  end


  # resources :relationships, only: [:show, :index, :create] do
  #   resources :talent_message, only: [:create]
  #   resources :headhunter_message, only: [:create]
  # end

  get 'repertoire_startup', to: "talents#repertory"


  # pour la messagerie
  resources :conversations, only: [ :show, :update, :create, :index] do
    resources :messages, only: [ :create ]
  end

  root to: 'pages#home'
  resources :steps_talent_infos
  resources :steps_startup_infos

  get 'welcome_talents', to: "pages#talent_home"
  get 'welcome_headhunters', to: "pages#headhunter_home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

