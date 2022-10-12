class PointOfInterest < ApplicationRecord
  has_many :comments
  belongs_to :category
  belongs_to :user 
  belongs_to :location, optional: true
end
