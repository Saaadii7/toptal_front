# frozen_string_literal: true

class Eatable < ApplicationRecord
  belongs_to :user

  validates :name, length: { minimum: 2 }, presence: true
  validates :eating_time, presence: true,
                          inclusion: { in: ((DateTime.now - 125.years)..DateTime.now), message: 'Date must be in past' }
  validates :calorie, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, presence: true

  scope :between, ->(start_datetime, end_datetime) { where(eating_time: start_datetime..end_datetime) }
end
