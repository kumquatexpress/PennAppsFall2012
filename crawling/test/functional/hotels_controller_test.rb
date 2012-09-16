require 'test_helper'

class HotelsControllerTest < ActionController::TestCase
  setup do
    @hotel = hotels(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hotels)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hotel" do
    assert_difference('Hotel.count') do
      post :create, hotel: { address: @hotel.address, city: @hotel.city, crime_count: @hotel.crime_count, images: @hotel.images, lat: @hotel.lat, level: @hotel.level, listing_header: @hotel.listing_header, listing_id: @hotel.listing_id, listing_url: @hotel.listing_url, long: @hotel.long, price: @hotel.price, zip: @hotel.zip }
    end

    assert_redirected_to hotel_path(assigns(:hotel))
  end

  test "should show hotel" do
    get :show, id: @hotel
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hotel
    assert_response :success
  end

  test "should update hotel" do
    put :update, id: @hotel, hotel: { address: @hotel.address, city: @hotel.city, crime_count: @hotel.crime_count, images: @hotel.images, lat: @hotel.lat, level: @hotel.level, listing_header: @hotel.listing_header, listing_id: @hotel.listing_id, listing_url: @hotel.listing_url, long: @hotel.long, price: @hotel.price, zip: @hotel.zip }
    assert_redirected_to hotel_path(assigns(:hotel))
  end

  test "should destroy hotel" do
    assert_difference('Hotel.count', -1) do
      delete :destroy, id: @hotel
    end

    assert_redirected_to hotels_path
  end
end
