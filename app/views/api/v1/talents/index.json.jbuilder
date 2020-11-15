json.talents @talents do |talent|
  json.id talent.id
  json.email talent.email
  json.full_name talent.full_name
  json.completing talent.completing
  json.last_sign_in_at talent.last_sign_in_at
end
