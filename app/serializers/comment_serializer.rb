class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user, :point_of_interest 
  has_one :user 
  has_one :point_of_interest
 

end
