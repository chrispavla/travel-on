class CreatePointOfInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :point_of_interests do |t|
      t.string :name
      t.string :image
      t.text :note
      t.integer :user_id
      t.integer :location_id
      t.integer :category_id

      t.timestamps
    end
  end
end
