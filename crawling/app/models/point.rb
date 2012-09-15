class Point < ActiveRecord::Base
  attr_accessible :lat, :level, :long, :num_crimes

  def self.calculate_point(lat, long)
  	crimes = Crime.where("lat < '"+(lat+0.0095).to_s+"' and
  		lat > '"+(lat-0.0095).to_s+"' and long < '"+(long+0.0095).to_s+"'
  		 and long > '"+(long-0.0095).to_s+"'")

  	print crimes.count

  	crimes.each do |crime|
  		value = 1
  		clat = crime.lat
  		clong = crime.long

  		distance = Math.sqrt(
  			(lat-clat)*(lat-clat)+
  			(long-clong)*(long-clong))

  		if(crime.crime_type == "Shooting"){
  			value *= 10
  		}
  		if(crime.crime_type == "Assault"){
  			value *= 2
  		}
  		if(crime.crime_type == "Robbery"){
  			value *= 1
  		}
  		if(crime.crime_type == "Theft"){
  			value *= 0.4
  		}
  		if(crime.crime_type == "Other"){
  			value *= 1
  		}
  		if(crime.crime_type == "Arrest"){
  			value *= 1
  		}


  end

end
