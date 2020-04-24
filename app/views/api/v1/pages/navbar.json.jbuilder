

json.extract! @user, :id, :firstname, :last_name, :full_name, :is_a_model, :count_unread_message, :completing
json.photo @photo
json.url @urls
