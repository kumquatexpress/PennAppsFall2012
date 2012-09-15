class Business < ActiveRecord::Base
  attr_accessible :address, :image_url, :lat, :long, :title, :yelp_id, :yelp_url
end
