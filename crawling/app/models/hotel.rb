class Hotel < ActiveRecord::Base
  attr_accessible :address, :city, :name, :crime_count, :images, :lat, :level, :listing_header, :listing_id, :listing_url, :long, :price, :zip,
  :rating

  def calculate_danger
  	unless self.level
	  	radius = 0.005
	  	begin
		  	if self.lat != nil && self.long != nil
		  		crimes = Crime.where("`lat` < '"+(self.lat+radius).to_s+"' and
		  		`lat` > '"+(self.lat-radius).to_s+"' and `long` < '"+(self.long+radius).to_s+"'
		  		 and `long` > '"+(self.long-radius).to_s+"'")
			   	crimescount = crimes.count
			  	rating = 0

			  	crimes.each do |crime|
			  		value = 1
			  		clat = crime.lat
			  		clong = crime.long
			  		distance = Math.sqrt(
			  			(self.lat-clat)*(self.lat-clat)+
			  			(self.long-clong)*(self.long-clong))

			  		if(crime.crime_type == "Shooting")
			  			value *= 10
			  		elsif(crime.crime_type == "Vandalism")
			  			value *= 2
			  		elsif(crime.crime_type == "Burglary")
			  			value *= 1
			  		elsif(crime.crime_type == "Arson")
			  			value *= 7
			  		elsif(crime.crime_type == "Assault")
			  			value *= 6
			  		elsif(crime.crime_type == "Robbery")
			  			value *= 3
			  		elsif(crime.crime_type == "Theft")
			  			value *= 0.5
			  		elsif(crime.crime_type == "Other")
			  			value *= 2
			  		elsif(crime.crime_type == "Arrest")
			  			value *= 5
			  		else
			  			value = 0
			  		end

			  		if distance > 0.0001
			  			value *= (0.00145/distance)
			  		else
			  			value *= 15
			  		end

			  		if value > 1000
			  			value = 1000
			  		end
			  		rating += value
		  		end

		  		level = rating
		  		crime_count = crimescount
		  		self.level = rating
		  		self.crime_count = crime_count
		  		self.save
		  	end
		rescue
			print 'NaN'
		end
	end
  end


  def self.find_hotels(location)
  	yaml = YAML.load_file('.yelp-api.yaml')

	consumer_key = yaml['consumer_key']
	consumer_secret = yaml['consumer_secret']
	token = yaml['token']
	token_secret = yaml['token_secret']

	api_host = 'api.yelp.com'

	consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => "http://#{api_host}"})
	access_token = OAuth::AccessToken.new(consumer, token, token_secret)

	path = "/v2/search?term=hotels&limit=20&location="+location

	res = JSON(access_token.get(path).body)

	print res
	res['businesses'].each do |business|
		id = business['id']

		unless Hotel.where(:listing_id => id).first
			name = business['name']
			image = business['image_url']
			listing_url = business['url']
			rating = business['rating']
			listing_header = business['snippet_text']
			location = business['location']

			latitude = location['coordinate']['latitude']
			longitude = location['coordinate']['longitude']
			address = location['display_address']
			city = location['city']

			hotel = Hotel.new(
				:listing_id => id,
				:name => name,
				:images => image,
				:listing_url => listing_url,
				:rating => rating,
				:listing_header => listing_header,
				:lat => latitude,
				:long => longitude,
				:address => address,
				:city => city)
			hotel.save
		end
	end
  end


end
