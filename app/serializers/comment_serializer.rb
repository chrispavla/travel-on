class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user_id, :point_of_interest_id
end
