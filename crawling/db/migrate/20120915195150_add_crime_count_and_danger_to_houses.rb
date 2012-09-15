class AddCrimeCountAndDangerToHouses < ActiveRecord::Migration
  def change
    add_column :houses, :crime_count, :integer
    add_column :houses, :level, :decimal
  end
end
