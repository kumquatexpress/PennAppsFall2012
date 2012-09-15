class AddSizeAndBedroomsToHouses < ActiveRecord::Migration
  def change
    add_column :houses, :size, :integer
    add_column :houses, :bedrooms, :string
  end
end
