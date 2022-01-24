# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def invite
    req = UserRequest.new(user_params)

    if req.valid?(:create)
      user = User.new(user_params.merge({ password: '123123123' }))
      if user.save
        render json: UserSerializer.new(user), status: 201
      else
        errors(user.errors, 'Something went wrong', 422)
      end
    else
      errors(req.errors, 'User params are not valid.')
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
