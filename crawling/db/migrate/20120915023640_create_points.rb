class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.decimal :lat, :precision => 25, :scale => 21
      t.decimal :long, :precision => 25, :scale => 21
      t.decimal :level
      t.integer :num_crimes

      t.timestamps
    end
  end
end
