class PointOfInterestSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :note, :category, :user, :location
  has_one :user
end
