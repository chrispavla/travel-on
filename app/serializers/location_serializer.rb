class LocationSerializer < ActiveModel::Serializer
  attributes :id, :city, :country
  has_many :point_of_interests
end
