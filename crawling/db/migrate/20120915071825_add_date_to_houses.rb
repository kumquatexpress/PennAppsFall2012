class AddDateToHouses < ActiveRecord::Migration
  def change
    add_column :houses, :date, :datetime
  end
end
