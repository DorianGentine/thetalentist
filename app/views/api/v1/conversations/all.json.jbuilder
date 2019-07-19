json.conversations @conversations do |conversation|
  json.conversation conversation, :id, :subject, :created_at, :updated_at

  json.participants conversation.participants do |participant|
    json.id participant.id
    if participant.is_a?(Talentist)
      json.type "talentist"
    elsif participant.is_a?(Talent)
      json.type "talent"
    else
      json.type "headhunter"
    end
    json.full_name participant.full_name
  end

  json.messages conversation.messages do |message|
    json.message message, :id, :subject, :body, :attachment, :sender_type, :sender_id, :created_at
  end
end
