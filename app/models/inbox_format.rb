class InboxFormat

  def discussions(conversations, user)
    conversations(conversations, user)
  end

  def discussion(user, conversation)
    conversation(user, conversation)
  end

  private

  def conversations(conversations, user)
    arra_conversations = []
    conversations.each do |conversation|
        participant = (conversation.participants - [user]).first
        p " coucou ICI participants #{ participant }"
        conversation = {
          participant: {
            full_name: participant.full_name,
            first_name: participant.firstname,
            last_name: participant.last_name,
            user_model: participant.class.name,
            job: participant.his_profession,
            avatar: participant.avatar.small_bright_face,
          },
          conversation_id: conversation.id,
          in_relation: user.witch_status?(participant),
          sender: sender(conversation.last_message, user),
          unread: conversation.is_unread?(user),
          update_at: conversation.last_message.updated_at,
          body: conversation.last_message.body,
        }
      arra_conversations << conversation
    end
    return arra_conversations
  end

  def conversation(user, conversation)
    @conversation =  conversation
    participant = (@conversation.participants - [user]).first
        conversation = {
          participant: {
            id: participant.id,
            full_name: participant.full_name,
            first_name: participant.firstname,
            last_name: participant.last_name,
            user_model: participant.class.name,
            online: participant.current_sign_in_at,
            job: participant.his_profession,
            avatar: participant.avatar.big_bright_face,
            phone: participant.phone,
            profil_url: participant.profil_url,
            test_1: question_1(participant),
            answer_1: answer_1(participant),
            test_2: question_2(participant),
            answer_2: answer_2(participant),
            test_3: question_3(participant),
            answer_3: answer_3(participant),
          },
          attachments: files(@conversation),
          conversation_id: @conversation.id,
          archived: nil,
          pin: nil,
          full_name: user.full_name,
          email: user.email,
          in_relation: user.witch_status?(participant),
          count: @conversation.messages.count,
          messages: messages(user, @conversation)
        }
  end

  def messages(user, conversation)
    arr_messages = []
    conversation.messages.each do |message|
      message_details = {
        sender_name: message.sender_type.constantize.find(message.sender_id).full_name,
        sender: sender(message, user),
        avatar: message.sender_type.constantize.find(message.sender_id).avatar.small_bright_face,
        body: message.body,
        attachment: message.attachment,
        update_at: message.updated_at,
      }
      arr_messages << message_details
    end
    return arr_messages
  end

  def sender(message, user)
    if message.sender_type.constantize.find(message.sender_id) == user
      return "Vous"
    else
      return message.sender_type.constantize.find(message.sender_id).firstname
    end
  end
  def files(conversation)
    files_send = []
    conversation.messages.each do |message|
      if message.attachment.url.present?
        files_send << attachment.url
      end
    end
    return files_send
  end

  def question_1(user)
    if user.is_a?(Talent)
      return "Disponibilité :"
    elsif user.is_a?(Headhunter)
      return "Nombre d'employés :"
    else
      return "Talentist"
    end
  end
  def question_2(user)
    if user.is_a?(Talent)
      return "Attentes salariales :"
    elsif user.is_a?(Headhunter)
      return "Domaines d'activités :"
    else
      return "Talentist"
    end
  end

  def question_3(user)
    if user.is_a?(Talent)
      return "Expérience :"
    elsif user.is_a?(Headhunter)
      return "Année de création :"
    else
      return "Talentist"
    end
  end

  def question_2(user)
    if user.is_a?(Talent)
      return "Attentes salariales :"
    elsif user.is_a?(Headhunter)
      return "Domaines d'activités :"
    else
      return "Talentist"
    end
  end

  def answer_1(user)
    if user.is_a?(Talent)
      return user.next_aventure.availability
    elsif user.is_a?(Headhunter)
      return user.startup.collaborators
    else
      return "Talentist"
    end
  end

  def answer_2(user)
    if user.is_a?(Talent)
      return user.next_aventure.remuneration
    elsif user.is_a?(Headhunter)
      return user.startup.sectors.last.present? ? user.startup.sectors.last.title : nil
    else
      return "Talentist"
    end
  end

  def answer_3(user)
    if user.is_a?(Talent)
      return user.talent_job.year
    elsif user.is_a?(Headhunter)
      return user.startup.year_of_creation
    else
      return "Talentist"
    end
  end
end
