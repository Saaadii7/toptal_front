# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    devise_for :users, controllers: { sessions: :sessions }, path_names: { sign_in: :login }

    resources :eatables, except: %i[new edit]

    # resources :reports, only: [] do
    #   get :calorie_intake, on: :collection
    # end
    get 'reports/calorie_intake', controller: :reports, action: :calorie_intake
    get 'reports/eatables_for_last_weeks', controller: :reports, action: :eatables_for_last_weeks
    get 'reports/average_calories', controller: :reports, action: :average_calories

    post 'users/invite', controller: :users, action: :invite
  end
end
