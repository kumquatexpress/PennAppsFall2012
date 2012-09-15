class Point < ActiveRecord::Base
  attr_accessible :lat, :level, :long, :num_crimes
  establish_connection 'mysql_' + Rails.env

  def self.calculate_all_points(min_lat, max_lat, min_long, max_long)
  	 i = min_lat
  	 while i < max_lat do
  	 	j = min_long
  		while j < max_long do
  			calculate_point(i, j)
  			j += 0.001
  		end
  		i+=0.001
  	end
  end


  def self.calculate_point(lat, long)
  	radius = 0.00145

  	crimes = Crime.where("lat < '"+(lat+radius).to_s+"' and
  		lat > '"+(lat-radius).to_s+"' and long < '"+(long+radius).to_s+"'
  		 and long > '"+(long-radius).to_s+"'")

  	crimescount = crimes.count

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
  		elsif(crime.crime_type == "Assault")
  			value *= 5
  		elsif(crime.crime_type == "Robbery")
  			value *= 2.5
  		elsif(crime.crime_type == "Theft")
  			value *= 1
  		elsif(crime.crime_type == "Other")
  			value *= 2.5
  		elsif(crime.crime_type == "Arrest")
  			value *= 5
  		else
  			value = 0
  		end

  		value *= (0.00145/distance)
  		rating += value
  	end

  	realrating = self.normalize(rating)

	newpoint = Point.new(
		:lat => lat,
		:long => long,
		:level => rating,
		:num_crimes => crimescount)
	newpoint.save

  end

  def self.normalize(rating)
  	return 1000/rating
  end

end
