class PointOfInterestSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :note, :category, :user, :location, :average_rating 
  has_one :user

  def average_rating 
    object.comments.average(:rating).to_i
  end

end
