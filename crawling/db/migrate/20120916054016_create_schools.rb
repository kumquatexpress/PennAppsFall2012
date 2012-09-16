class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :name
      t.string :level
      t.string :address
      t.decimal :lat
      t.decimal :long
      t.string :listing_url

      t.timestamps
    end
  end
end
