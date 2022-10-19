class LocationSerializer < ActiveModel::Serializer
  attributes :id, :city, :country, :latitude, :longitude, :uniq_user
  has_many :point_of_interests
 

  def uniq_user 
    object.users[0]
  end

  def latitude 
    object.latitude.to_f
  end

  def longitude 
    object.longitude.to_f
  end

end
