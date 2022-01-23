# frozen_string_literal: true

class UserSerializer
  include JSONAPI::Serializer

  attribute :name, :email, :daily_calorie_threshold
end
