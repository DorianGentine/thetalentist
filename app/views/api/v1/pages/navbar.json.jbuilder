

json.extract! @user, :id, :firstname, :last_name, :full_name, :is_a_model, :count_unread_message
json.photo @photo
json.url @urls
