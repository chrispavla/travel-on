class User < ApplicationRecord
  has_many :point_of_interests
  has_many :locations, through: :point_of_interests
  has_many :comments

  has_secure_password
end
