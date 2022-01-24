# frozen_string_literal: true

User.find_or_create_by(name: 'Saad', email: 'admin@topfit.com', admin: true) do |user|
  user.update(password: '123123123')
end

User.find_or_create_by(name: 'John', email: 'user@topfit.com', admin: false) do |user|
  user.update(password: '123123123')
end
