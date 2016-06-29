require 'test_helper'

class GruposControllerTest < ActionController::TestCase
  test "should get bomboemia" do
    get :bomboemia
    assert_response :success
  end

  test "should get tum" do
    get :tum
    assert_response :success
  end

  test "should get gpum" do
    get :gpum
    assert_response :success
  end

  test "should get gmp" do
    get :gmp
    assert_response :success
  end

  test "should get tunaominho" do
    get :tunaominho
    assert_response :success
  end

  test "should get gfum" do
    get :gfum
    assert_response :success
  end

end
