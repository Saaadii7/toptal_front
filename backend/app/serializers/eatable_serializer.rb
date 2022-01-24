# frozen_string_literal: true

class EatableSerializer
  include JSONAPI::Serializer

  attribute :name, :eating_time, :calorie
end
