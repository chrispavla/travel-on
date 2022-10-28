Rails.application.routes.draw do
  resources :comments, only: [:create, :update, :destroy]
  resources :locations, only: [:index, :show, :create]
  resources :point_of_interests
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # Custom route for showing comments attached to specific point of interest
  get '/comments/:point_of_interest_id', to: 
  'comments#specific_point_of_interest'
  # Defines the root path route ("/")
  # root "articles#index"
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
