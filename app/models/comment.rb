class Comment < ApplicationRecord
  belongs_to :point_of_interest
  belongs_to :user

  validates :comment, :rating, presence: true
  
end
