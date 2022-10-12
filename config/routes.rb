Rails.application.routes.draw do
  resources :categories
  resources :comments
  resources :locations
  resources :point_of_interests
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  # Defines the root path route ("/")
  # root "articles#index"
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
