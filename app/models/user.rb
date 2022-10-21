class User < ApplicationRecord
  has_many :point_of_interests
  has_many :locations, through: :point_of_interests
  has_many :comments

  validates :username, presence: :true, uniqueness: :true
  validates :password, :profile_image, :first_name, :last_name, presence: :true

  has_secure_password
end
