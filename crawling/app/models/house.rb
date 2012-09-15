class House < ActiveRecord::Base
  attr_accessible :address, :city, :images, :lat, :listing_header, :listing_id, :listing_url, :long, :price, :zip
end
