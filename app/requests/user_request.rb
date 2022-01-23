# frozen_string_literal: true

class UserRequest < CommonRequest
  attr_accessor :name, :email, :password

  validates :name, :email, presence: true, on: [:create]
end
