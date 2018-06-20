require 'test_helper'

class StartupsControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get startups_update_url
    assert_response :success
  end

end
