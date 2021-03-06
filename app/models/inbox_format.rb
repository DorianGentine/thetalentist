class InboxFormat

  def discussions(conversations, user)
    conversations(conversations, user)
  end

  def discussion(user, conversation)
    conversation(user, conversation)
  end

  # private

  def conversations(conversations, user)
    arra_conversations = []
    p "________LES CONVS SONT: #{conversations}"
    conversations.each do |conversation|
      p "Une conv est: #{conversation}"
      if conversation.participants.count > 1
        config_convs = ConfigConversation.where(conversation_id: conversation.id, user_id: user.id, user_email: user.email)
        config_conv = config_convs.nil? || config_convs.first.nil? ?  nil : config_convs.first
        sennder_message = conversation.last_message.sender_type.constantize.find(conversation.last_message.sender_id)
        if config_conv.present?
          participant = (conversation.participants - [user]).first
          avatar = !participant.avatar.nil? ? participant.avatar : nil
          conversation = {
              participant: {
                full_name: participant.full_name,
                first_name: participant.firstname,
                last_name: participant.last_name,
                user_model: participant.class.name,
                job: participant.his_profession,
                avatar: avatar,
                startup: startup(participant,)
              },
              conversation_id: conversation.id,
              archived: config_conv.archived,
              pin: config_conv.pin,
              in_relation: user.witch_status?(participant),
              sender: sender(sennder_message, user),
              unread: conversation.is_unread?(user),
              update_at: conversation.last_message.updated_at,
              body: conversation.last_message.body,
            }
        else
          conversation = {
            error: "La conversation #{conversation.id} porte un default pour InboxFormat"
          }
        end
        arra_conversations << conversation
      end
    end
    return arra_conversations
  end

  def conversation(user, conversation)
    @conversation =  conversation
    participant = (@conversation.participants - [user]).first
    avatar = !participant.avatar.nil? ? participant.avatar : nil
    config_conv = ConfigConversation.where(conversation_id: conversation.id, user_id: user.id, user_email: user.email).first
        conversation = {
          participant: {
            id: participant.id,
            full_name: participant.full_name,
            first_name: participant.firstname,
            last_name: participant.last_name,
            user_model: participant.class.name,
            online: participant.current_sign_in_at,
            job: participant.his_profession,
            city: city(participant),
            avatar: avatar,
            phone: participant.phone,
            profil_url: participant.profil_url,
            test_1: question_1(participant),
            answer_1: answer_1(participant),
            test_2: question_2(participant),
            answer_2: answer_2(participant),
            test_3: question_3(participant),
            answer_3: answer_3(participant),
            startup: startup(participant),
          },
          attachments: files(config_conv),
          conversation_id: @conversation.id,
          config_conv_id: config_conv.id,
          archived: config_conv.archived,
          pin: config_conv.pin,
          full_name: user.full_name,
          email: user.email,
          in_relation: user.witch_status?(participant),
          count: @conversation.messages.count,
          messages: messages(user, @conversation).sort_by { |a| a[:update_at] }
        }
  end

  def messages(user, conversation)
    arr_messages = []
    conversation.messages.each do |message|
      sender_message = message.sender_type.constantize.find(message.sender_id)
      message_details = {
        sender_name: sender_message.full_name,
        sender: sender(sender_message, user),
        avatar: sender_message.avatar,
        body: message.body,
        attachment: message.attachment,
        update_at: message.updated_at,
      }
      arr_messages << message_details
    end
    return arr_messages
  end

  def sender(sender_message, user)
    if sender_message == user
      return "Vous"
    else
      p "Sender >>>>>>>>>>> #{sender_message}"
      return sender_message.firstname
    end
  end
  def files(config_conv)
    p "config_conv: #{config_conv}"
    if config_conv.present?
      config_conv.files.map do |file|
        {name: file.filename,
        url: "https://res.cloudinary.com/da4nnrzbu/image/upload/#{file.key}",
        key: file.key
        }
      end
    end
  end


  def question_1(user)
    if user.is_a?(Talent)
      return "Disponibilité :"
    elsif user.is_a?(Headhunter)
      return "Nombre d'employés :"
    else
      return "Téléphone :"
    end
  end

  def question_2(user)
    if user.is_a?(Talent)
      return "Attentes salariales :"
    elsif user.is_a?(Headhunter)
      return "Domaines d'activités :"
    else
      return "E-mail :"
    end
  end

  def question_3(user)
    if user.is_a?(Talent)
      return "Expérience :"
    elsif user.is_a?(Headhunter)
      return "Année de création :"
    else
      return "Adresse :"
    end
  end

  def answer_1(user)
    if user.is_a?(Talent)
      return user.next_aventure.availability
    elsif user.is_a?(Headhunter)
      return user.startup.collaborators
    else
      return user.phone
    end
  end

  def answer_2(user)
    if user.is_a?(Talent)
      return user.next_aventure.remuneration
    elsif user.is_a?(Headhunter)
      return user.startup.sectors.last.present? ? user.startup.sectors.last.title : nil
    else
      return user.email
    end
  end

  def answer_3(user)
    if user.is_a?(Talent)
      if user.talent_job
        return user.talent_job.year
      else
        return 0
      end
    elsif user.is_a?(Headhunter)
      return user.startup.year_of_creation
    else
      return "9 Rue Saint-Fiacre, 75002 Paris"
    end
  end

  def city(user)
    if user.is_a?(Talentist)
      "Paris"
    elsif user.is_a?(Headhunter)
      user.startup.address
    else
      user.city
    end
  end

  def startup(participant)
    startup = nil
    if participant.is_a?(Headhunter)
      startup = {
        name: participant.startup.name,
        logo: participant.startup.logo,
      }
    end
    return startup
  end
end
