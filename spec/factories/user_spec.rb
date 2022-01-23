# frozen_string_literal: true

require 'factory_bot'

FactoryBot.define do
  factory :user do
    name { 'Saaad' }
    email { 'saaad@yopmail.com' }
    password { '123123123' }

    trait :admin do
      admin { true }
    end

    trait :regular_user do
      admin { false }
    end
  end
end
