class AddLongitudeToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :longitude, :string
  end
end
