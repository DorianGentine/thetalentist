require 'test_helper'

class HttpErrorsControllerTest < ActionDispatch::IntegrationTest
  test "should get error_404" do
    get http_errors_error_404_url
    assert_response :success
  end

  test "should get error_422" do
    get http_errors_error_422_url
    assert_response :success
  end

  test "should get error_500" do
    get http_errors_error_500_url
    assert_response :success
  end

end
