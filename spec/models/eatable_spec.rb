# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Eatable, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:eating_time) }
    it { is_expected.to validate_presence_of(:calorie) }
    it { is_expected.to validate_length_of(:name).is_at_least(2) }
    it { is_expected.to validate_numericality_of(:calorie).is_greater_than_or_equal_to(0) }
    it { is_expected.to have_db_index(:user_id) }
  end
end
