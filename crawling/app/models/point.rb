class Point < ActiveRecord::Base
  attr_accessible :lat, :level, :long, :num_crimes

  def self.calculate_all_points(min_lat, max_lat, min_long, max_long)
  	 i = min_lat
  	 while i < max_lat do
  	 	j = min_long
  		while j < max_long do
  			calculate_point(i, j)
  			j += 0.00145
  		end
  		i+=0.00145
  	end
  end


  def self.calculate_point(lat, long)
  	radius = 0.007

  	crimes = Crime.where("lat < '"+(lat+radius).to_s+"' and
  		lat > '"+(lat-radius).to_s+"' and long < '"+(long+radius).to_s+"'
  		 and long > '"+(long-radius).to_s+"'")

  	print crimes.count

  	rating = 100

  	crimes.each do |crime|
  		value = 1
  		clat = crime.lat
  		clong = crime.long

  		distance = Math.sqrt(
  			(lat-clat)*(lat-clat)+
  			(long-clong)*(long-clong))

  		if(crime.crime_type == "Shooting")
  			value *= 10
  		end
  		if(crime.crime_type == "Assault")
  			value *= 3
  		end
  		if(crime.crime_type == "Robbery")
  			value *= 1
  		end
  		if(crime.crime_type == "Theft")
  			value *= 0.4
  		end
  		if(crime.crime_type == "Other")
  			value *= 1
  		end
  		if(crime.crime_type == "Arrest")
  			value *= 3
  		end

  		value *= (0.008/distance)
  		rating -= value
  	end

	newpoint = Point.new(
		:lat => lat,
		:long => long,
		:level => rating,
		:num_crimes => crimes.count)
	newpoint.save

  end

end
