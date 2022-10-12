class PointOfInterestSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :note, :user_id, :location_id
end
