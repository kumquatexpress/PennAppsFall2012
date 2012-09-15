class Crime < ActiveRecord::Base
  attr_accessible :address, :date, :lat, :long, :crime_type, :spotcrime_id
  establish_connection 'sqlite_' + Rails.env
  require 'open-uri'
  require 'json'

  def self.get_all_crimes(min_lat, max_lat, min_long, max_long)
  	 i = min_lat
  	 while i < max_lat do
  	 	j = min_long
  		while j < max_long do
  			get_crimes(i, j)
  			j += 0.001
  		end
  		i+=0.001
  	end
  end

  def self.get_crimes(lat, long)
  	print "getting crimes for"
  	print lat
  	print long
  	start_date = '2011-01-01'
  	radius = 0.002
  	http_uri = 'http://api.spotcrime.com'+
  	'/crimes.json?lat='+lat.to_s+'&lon='+long.to_s+
  	'&radius='+radius.to_s+'&key=MLC&since='+start_date+'&max_records=500'

  	body = open(http_uri).read
  	parsed_json = JSON(body)
  	print "got json"

  	parsed_json['crimes'].each do |crime|
  		print "hello"
  		type = crime['type']
  		did = crime['cdid']
  		address = crime['address']
  		lat = crime['lat']
  		long = crime['lon']
  		date = crime['date']
  		link = crime['link']

  		if date
  			print date
  			newdate = date[0..5]+'20'+date[6..date.length-1]
  			newdate.gsub!('/', '-')
  			print newdate
  			realdate= 
  				DateTime.strptime(newdate, '%m-%d-%Y %H:%M').to_time
  		end

  		unless Crime.where(:spotcrime_id => did).first
  			temp = Crime.new(
  				:crime_type => type,
  				:spotcrime_id => did,
  				:address => address,
  				:lat => lat,
  				:long => long,
  				:date => realdate ||= nil
  				)
  			temp.save
  		end
  	end  	
  end

end
