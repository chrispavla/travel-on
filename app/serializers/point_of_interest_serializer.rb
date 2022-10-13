class PointOfInterestSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :note, :user, :location
  has_one :user
end
