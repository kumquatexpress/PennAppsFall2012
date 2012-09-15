class Crime < ActiveRecord::Base
  attr_accessible :address, :date, :lat, :long, :type
end
