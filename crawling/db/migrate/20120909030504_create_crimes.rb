class CreateCrimes < ActiveRecord::Migration
  def change
    create_table :crimes do |t|
      t.string :type
      t.string :address
      t.decimal :lat, :precision => 25, :scale => 21
      t.decimal :long, :precision => 25, :scale => 21
      t.datetime :date
      t.integer :spotcrime_id

      t.timestamps
    end
  end
end
