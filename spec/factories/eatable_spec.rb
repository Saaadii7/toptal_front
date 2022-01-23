# frozen_string_literal: true

require 'factory_bot'

FactoryBot.define do
  factory :eatable do
    name { 'Banana' }
    eating_time { DateTime.now }
    calorie { 10 }
  end
end
