class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :password_digest, :profile_image, :locations
  has_many :comments

  def locations 
    object.locations.uniq
  end


end
