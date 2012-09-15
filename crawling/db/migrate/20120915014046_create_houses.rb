class CreateHouses < ActiveRecord::Migration
  def change
    create_table :houses do |t|
      t.integer :listing_id
      t.string :listing_url
      t.integer :price
      t.text :listing_header
      t.string :address
      t.string :city
      t.integer :zip
      t.text :images
      t.decimal :lat, :precision => 25, :scale => 21
      t.decimal :long, :precision => 25, :scale => 21

      t.timestamps
    end
  end
end
