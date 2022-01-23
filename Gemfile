# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.0'
gem 'rails', '~> 7.0.1'

gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'devise'

gem 'bootsnap', require: false
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails'
end

group :development do
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

group :test do
  gem 'rspec-rails', '~> 5.0.0'
  gem 'rubocop-rspec'
  gem 'shoulda-matchers', '~> 5.0'
  gem 'factory_bot', '~> 6.2.0'
  # gem 'simplecov', require: false
end
