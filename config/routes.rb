Rails.application.routes.draw do
  require "sidekiq/web"
    mount Sidekiq::Web => '/sidekiq'
  authenticate :talentist, lambda { |u| u.admin } do
  end

  # get 'contact_forms/create'
  match "/404", :to => "http_errors#error_404", :via => :all
  match "/422", :to => "http_errors#error_422", :via => :all
  match "/500", :to => "http_errors#error_500", :via => :all


  root to: 'pages#home'

  ActiveAdmin.routes(self)
  devise_for :talentists, path: 'talentists', controllers: {
    sessions: 'talentists/sessions',
    passwords: 'talentists/passwords',
    registrations: 'talentists/registrations'
  }
  resources :talentists, only: [ :edit ] do
    resources :formations, only: [ :update ]
  end

  devise_for :headhunters, path: 'headhunters', controllers: {
    sessions: 'headhunters/sessions',
    passwords: 'headhunters/passwords',
    registrations: 'headhunters/registrations'
  }
  resources :headhunters, only: [:show, :update, :index, :edit, :destroy] do
    patch 'to_validate', :on => :member
    patch 'update_profile', :on => :member
    patch 'update_photos', :on => :member
    patch 'update_startup', :on => :member
    resources :conversations, only: [ :show ]
  end
  # show is to display the profil and update to edit it
  # le repertoire est la où on affiche tous les talents

  get 'repertoire', to: "headhunters#repertory"
  put 'repertoire', to: "headhunters#update"

  resources :startups, only: [ :update ]

  get 'repertoire_startup', to: "talents#repertory"


  devise_for :talents, path: 'talents', controllers: {
    omniauth_callbacks: 'talents/omniauth_callbacks',
    sessions: 'talents/sessions',
    passwords: 'talents/passwords',
    registrations: 'talents/registrations',
  }

  resources :relationships, only: [ :create ]

  resources :talents, only: [:show, :update, :index, :edit] do
    member do
      get 'info_pdf'
      get 'welcome', to: "pages#welcome_talent"
      get 'welcome/:step', to: "pages#welcome_talent"
      # patch 'update_profile'
      # patch 'update_formation_and_skill'
      # patch 'update_experience'
      # patch 'update_next_aventure'
      patch 'validation'
      patch 'refused'
      patch 'visible'
    end
    resources :conversations, only: [ :show ]
  end

  resources :contact_forms, only: [ :create ]


  # pour la messagerie
  get 'messagerie', to: "pages#messagerie"
  get '/messagerie/:id', to: "pages#messagerie"
  resources :conversations, only: [ :show, :update] do
    resources :messages, only: [ :create ]
  end

  resources :steps_startup_infos

  get 'legal_informations', to: "pages#legal_informations", as: "mentions_legales"
  get 'cgu_talents', to: "pages#cgu_talents", as: "cgu_talents"
  get 'cgu_employeurs', to: "pages#cgu_headhunters", as: "cgu_employeurs"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get :current_user, to: "pages#navbar"

      resources :company_types, only: [ :index ]
      resources :config_conversations, only: [ :update ]
      resources :formations, only: [ :index ]
      resources :headhunters, only: [ :index ]
      resources :jobs, only: [ :index ]
      resources :knowns, only: [ :index ]
      resources :languages, only: [ :index ]
      resources :pins, only: [ :create, :destroy ]
      resources :relationships, only: [ :create ]
      resources :startups, only: [ :index ]
      resources :sectors, only: [ :index ]
      resources :skills, only: [ :index ]
      resources :technos, only: [ :index ]
      
      resources :conversations, only: [ :show, :index ] do
        resources :messages, only: [ :create ]
      end
      resources :notifications, only: [ :index ]
      resources :headhunters, only: [ :index, :show] do
        resources :conversations, only: [:index, :show]
      end
      resources :talents, only: [ :index, :show, :update ] do
        collection do
          get :repertoire
          get :repertoire_pagy
          get :analytics
          patch :sort
        end
        member do
          post :recommandation
          patch 'update_avatar'
        end
        resources :conversations, only: [:index, :show]
      end
    end
  end


end

