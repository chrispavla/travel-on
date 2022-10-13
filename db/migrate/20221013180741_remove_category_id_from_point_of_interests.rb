class RemoveCategoryIdFromPointOfInterests < ActiveRecord::Migration[7.0]
  def change
    remove_column :point_of_interests, :category_id
  end
end
