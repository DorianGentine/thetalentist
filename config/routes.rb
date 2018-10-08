Rails.application.routes.draw do

  # get 'contact_forms/create'
  match "/404", :to => "http_errors#error_404", :via => :all
  match "/422", :to => "http_errors#error_422", :via => :all
  match "/500", :to => "http_errors#error_500", :via => :all


  root to: 'pages#home'

  ActiveAdmin.routes(self)
  devise_for :talentists, path: 'talentists'

  devise_for :headhunters, path: 'headhunters', controllers: {
    sessions: 'headhunters/sessions',
    passwords: 'headhunters/passwords',
    registrations: 'headhunters/registrations'
  }
  resources :startups, only: [ :update ]
  resources :headhunters, only: [:show, :update, :index] do
    patch 'to_validate', :on => :member
    resources :conversations, only: [ :show ]
  end
  # show is to display the profil and update to edit it
  # le repertoire est la où on affiche tous les talents

  get 'repertoire', to: "headhunters#repertory"
  put 'repertoire', to: "headhunters#update"

  get 'repertoire_startup', to: "talents#repertory"


  devise_for :talents, path: 'talents', controllers: {
    omniauth_callbacks: 'talents/omniauth_callbacks',
    sessions: 'talents/sessions',
    passwords: 'talents/passwords',
    registrations: 'talents/registrations'
  }

  resources :relationships, only: [ :create ]

  resources :talents, only: [:show, :update, :index, :edit] do
    get 'info_pdf', on: :member
    put 'update_profile', :on => :member
    put 'update_formation_and_skill', :on => :member
    put 'update_experience', :on => :member
    put 'update_next_aventure', :on => :member
    patch 'to_validate', :on => :member
    resources :conversations, only: [ :show ]
  end

  resources :contact_forms, only: [ :create ]


  # pour la messagerie
  resources :conversations, only: [ :show, :update] do
    resources :messages, only: [ :create ]
  end

  resources :steps_talent_infos
  resources :steps_startup_infos

  get 'waiting_for_validation', to: "pages#waiting_for_validation"
  get 'welcome_talents', to: "pages#talent_home"
  get 'welcome_startups', to: "pages#headhunter_home", as: "welcome_headhunters"
  get 'legal_informations', to: "pages#legal_informations", as: "mentions_legales"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

