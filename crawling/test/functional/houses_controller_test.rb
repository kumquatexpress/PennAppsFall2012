require 'test_helper'

class HousesControllerTest < ActionController::TestCase
  setup do
    @house = houses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:houses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create house" do
    assert_difference('House.count') do
      post :create, house: { address: @house.address, city: @house.city, images: @house.images, lat: @house.lat, listing_header: @house.listing_header, listing_id: @house.listing_id, listing_url: @house.listing_url, long: @house.long, price: @house.price, zip: @house.zip }
    end

    assert_redirected_to house_path(assigns(:house))
  end

  test "should show house" do
    get :show, id: @house
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @house
    assert_response :success
  end

  test "should update house" do
    put :update, id: @house, house: { address: @house.address, city: @house.city, images: @house.images, lat: @house.lat, listing_header: @house.listing_header, listing_id: @house.listing_id, listing_url: @house.listing_url, long: @house.long, price: @house.price, zip: @house.zip }
    assert_redirected_to house_path(assigns(:house))
  end

  test "should destroy house" do
    assert_difference('House.count', -1) do
      delete :destroy, id: @house
    end

    assert_redirected_to houses_path
  end
end
