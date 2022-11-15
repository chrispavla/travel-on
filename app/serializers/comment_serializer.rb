class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user, :point_of_interest, :created_at, :updated_at 
  has_one :user 
  has_one :point_of_interest


  def created_at 
    object.created_at.strftime('%m/%d/%Y at %I:%M%p')
  end
 
  def updated_at 
    object.updated_at.strftime('%m/%d/%Y at %I:%M%p')
  end

end
