# json.headhunters @headhunters
json.headhunters @headhunters do |headhunter|
  json.id headhunter.id
  json.email headhunter.email
  json.firstname headhunter.firstname
  json.startup headhunter.startup.name
end