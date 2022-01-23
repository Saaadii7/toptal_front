class Eatable < ApplicationRecord
    belongs_to :user

    validates :name, length: { minimum: 2 }, presence: true
    validates :eating_time, presence: true
    validates :calorie, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, presence: true
    
end
