# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.0'
gem 'rails', '~> 7.0.1'

gem 'devise'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'

gem 'bootsnap', require: false
gem 'cancancan'
gem 'groupdate'
gem 'jsonapi-serializer'
gem 'pagy', '~> 3.5'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails'
end

group :development do
  gem 'byebug'
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

group :test do
  gem 'factory_bot', '~> 6.2.0'
  gem 'rspec-rails', '~> 5.0.0'
  gem 'rubocop-rspec'
  gem 'shoulda-matchers', '~> 5.0'
  # gem 'simplecov', require: false
end
