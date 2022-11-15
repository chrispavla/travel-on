class PointOfInterest < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user 
  belongs_to :location, optional: true

  validates :name, :category, :image, :note, presence: true
end
