class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :title
      t.string :address
      t.decimal :lat, :precision => 25, :scale => 21
      t.decimal :long, :precision => 25, :scale => 21
      t.string :image_url
      t.string :yelp_url
      t.string :yelp_id

      t.timestamps
    end
  end
end
