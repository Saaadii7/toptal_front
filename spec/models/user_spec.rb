# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:eatables) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { is_expected.to validate_uniqueness_of(:api_token) }
  end

  describe 'role scopes' do
    let(:admin) { create(:user, :admin, email: 'admin@yopmail.com') }
    let(:regular_user) { create(:user, :regular_user, email: 'employee@yopmail.com') }

    it 'returns admins' do
      expect(User.admins).to include(admin)
      expect(User.admins).not_to include(regular_user)
    end

    it 'returns regular users' do
      expect(User.regular_users).to include(regular_user)
      expect(User.regular_users).not_to include(admin)
    end
  end

  describe 'class methods' do
    context 'admin?' do
      let(:admin) { create(:user, :admin, email: 'admin@yopmail.com') }
      let(:regular_user) { create(:user, :regular_user, email: 'employee@yopmail.com') }

      context 'when admin' do
        it 'returns true' do
          expect(admin.admin?).to eq(true)
        end
      end

      context 'when regular user' do
        it 'returns false' do
          expect(regular_user.admin?).to eq(false)
        end
      end
    end
  end
end
