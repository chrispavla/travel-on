class Location < ApplicationRecord
  has_many :point_of_interests
  has_many :users, through: :point_of_interests

  validates :city, :country, :latitude, :longitude, presence: true
   
end
