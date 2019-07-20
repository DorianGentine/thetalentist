
json.array! @notifications do |notification|

    json.id notification.id
    json.title notification.title
    json.created_at distance_of_time_in_words(notification.created_at, Time.now)

end
