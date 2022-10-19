class AddLatitudeToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :latitude, :string
  end
end
