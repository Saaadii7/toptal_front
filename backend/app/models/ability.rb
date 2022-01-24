# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # For logged in users
    return unless user.present?

    can :create, Eatable, user: user
    can %i[read update destroy], Eatable, user:, id: user.eatables.ids

    return unless user.admin?

    can :manage, Eatable
    can :manage, User
  end
end
