class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :eatables, dependent: :delete_all

  validates :name, presence: true
  validates :email, :api_token, presence: true, uniqueness: true
  validates :admin, inclusion: [true, false]

  before_validation { self.api_token = SecureRandom.hex(100) if api_token.blank? }

  scope :admins, -> { where(admin: true) }
  scope :regular_users, -> { where(admin: false) }

  def admin?
    self.admin === true
  end

end
