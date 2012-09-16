class School < ActiveRecord::Base
  attr_accessible :address, :lat, :listing_url, :level, :long, :name

  require 'net/http'
  require 'nokogiri'
  require 'json'
  require 'open-uri'

  geocoded_by :address, :latitude => :lat,
  :longitude => :long
  after_validation :geocode

 def self.find_all_schools(place)
  	index = 0
  	while(find_schools(place, index))
  		index += 1
  	end
  end

  def self.find_schools(place, number = nil)
  	ret = false

  	if number < 1 
  		http_uri2 = "http://www.usnews.com/education/best-high-schools/national-rankings/spp%2B100"
  	else 
  		http_uri2 = "http://www.usnews.com/education/best-high-schools/national-rankings/spp%2B100/page%2B"+number.to_s
  	end
  	uri = URI(http_uri2)
  	body = Net::HTTP.get(uri)
  	page = Nokogiri::HTML(body)
  	print page.class

	items = page.css('div#content div#article table.ranking-data tbody tr')
	print items

	if items.count > 50
		ret = true
	end

	items.each do |item|
		rank = item.css('td.column-first span.rankings-score').text
    rank.gsub('\n', " ").strip
    newrank = rank[1..rank.length]


		name = item.css('td.column-even div.school-name a').text
		address = item.css('td.column-even div.school-address div.school-street').text+" "
		item.css('td.column-even div.school-address div.school-csz')

		sublink = item.css('td.column-even div.school-name a')[0]['href']
		listing_url = "http://www.usnews.com"+sublink

		current_house = School.where(:name => name).first
  		unless current_house
  			temp = School.new(
  				:address => address,
  				:level => newrank,
  				:name => name,
  				:listing_url => listing_url
  				)
  			temp.save
  		end
	end
	return ret
  end

end
