# frozen_string_literal: true

class CommonRequest
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  # ADDRESS_BEFORE_PRODUCTION
  def validate_errors?(scenario = [])
    invalid?(scenario)
  end

  # ADDRESS_BEFORE_PRODUCTION
  def validate_exceptions?(scenario = [])
    raise "Error Found in #{self.class}: #{errors.details}" if invalid?(scenario)

    true
  end
end
