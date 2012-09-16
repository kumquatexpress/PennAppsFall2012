class CreateHotels < ActiveRecord::Migration
  def change
    create_table :hotels do |t|
      t.string :address
      t.string :name
      t.string :city
      t.text :images
      t.decimal :lat, :precision => 25, :scale => 21
      t.decimal :long, :precision => 25, :scale => 21
      t.integer :zip
      t.string :price
      t.decimal :level
      t.integer :crime_count
      t.string :listing_url
      t.string :listing_id
      t.text :listing_header
      t.decimal :rating, :precision => 2, :scale => 1

      t.timestamps
    end
  end
end
