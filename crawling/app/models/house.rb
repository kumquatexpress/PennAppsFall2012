class House < ActiveRecord::Base
  attr_accessible :address, :city, :images, 
  :lat, :listing_header, :listing_id, :listing_url, 
  :long, :price, :zip, :date, :crime_count, :level
  establish_connection 'mysql_' + Rails.env
  require 'net/http'
  require 'nokogiri'

  geocoded_by :address, :latitude => :lat,
  :longitude => :long
  after_validation :geocode

  def calculate_latitude
  	unless self.lat && self.long
	  	latlong = self.geocode
	  	if latlong != nil
		  	self.lat = geocode[0]
		  	self.long = geocode[1]
		  	self.save
		end
  	end
  	sleep(1)
  end

  def calculate_danger
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

  def redo_address
  	address = self.address
  	if address
	  	address.strip
		address = address[2..address.length-2]
		if address
			address.gsub(",", " ")
			address.gsub("/", " ")
			self.address = address
			self.save
		end
	end
  end

  def self.find_all_houses(place)
  	index = 0
  	while(find_houses(place, index))
  		index += 100
  	end
  end

  def self.find_houses(place, number = nil)
  	ret = false

  	if number > 0 
  		http_uri2 = "http://philadelphia.craigslist.org/sub/index"+number.to_s+".html"
  	else 
  		http_uri2 = "http://philadelphia.craigslist.org/sub/index.html"
  	end


  	uri = URI(http_uri2)
  	body = Net::HTTP.get(uri)
  	page = Nokogiri::HTML(body)
  	print page.class

	items = page.css('p.row')

	if items.count > 50
		ret = true
	end

	items.each do |item|
		details = item.css('span.itemph').text
		price_start = details.index("$")
		if price_start
			price_end = details.index("/", price_start)
		end
		if price_start && price_end
			price = details[price_start+1..price_end].strip
		end
		print price

		bedroom_start = details.index("br")
		if bedroom_start
			bedrooms = details[bedroom_start-1]
		else
			bedrooms = "Unknown"
		end
		print bedrooms

		listing_url = item.css('a')[0]['href']
		idfromurl = listing_url.to_s.split("/").last
		listing_id = idfromurl[0..idfromurl.index(".")]
		
		print listing_id

		listing_header = item.css('a').text
		address = item.css('span.itempn').text
	  	if address
		  	address.strip
			naddress = address[2..address.length-2]
			if naddress
				naddress.gsub(",", " ")
				naddress.gsub("/", " ")
				address = naddress
			end
		end

  		unless House.where(:listing_id => listing_id).first
  			temp = House.new(
  				:address => address,
  				:listing_header => listing_header,
  				:listing_id => listing_id,
  				:listing_url => listing_url,
  				:price => price
  				)
  			temp.save
  		end
	end

	return ret
  end

end
