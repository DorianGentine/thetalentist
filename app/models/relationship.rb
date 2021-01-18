class Relationship < ApplicationRecord
  STATUS_TYPE_ACCEPT = 'Accepter'

  belongs_to :talent, optional: true
  belongs_to :headhunter, optional: true
  belongs_to :talentist, optional: true

  before_destroy :destroy_conversation

  after_create :create_a_notification, :create_config_conversations
  # after_create :create_a_notification, :send_message
  after_save :modification_status_notification

  validates_uniqueness_of :talent_id, scope: :headhunter_id,  :message => "Cette relation existe déjà"

  def destroy_conversation
    conversations = self.talent.mailbox.conversations

    conversations.each do |conversation|
      participant = (conversation.participants - [self.talent]).first
      if participant == self.headhunter
        conversation.destroy
      end
    end
  end

  private

    def modification_status_notification
      if self.status == "Accepter"
        accepeted_a_notification
      elsif self.status == "Refuser"
        refused_a_notification
      end
    end

    def create_config_conversations
      conversation = Mailboxer::Conversation.find_by(id: conversation_id)
      return if conversation.nil?

      ConfigConversation.create(
        conversation_id: conversation.id,
        user_id: conversation.participants.first.id,
        user_email: conversation.participants.first.email
      )
      ConfigConversation.create(
        conversation_id: conversation.id,
        user_id: conversation.participants.second.id,
        user_email: conversation.participants.second.email
      )
    end

    def send_message
      headhunter = self.headhunter
      talent = self.talent
      headhunter.send_message(talent, "#{headhunter.firstname} de #{headhunter.startup.name} souhaite rentrer en contact avec vous", "#{headhunter.firstname}")
      self.conversation_id = Mailboxer::Conversation.between(talent, headhunter).last.id
      talent.send_invitation(headhunter)
    end

    def create_a_notification
      Notification.create(title: "#{self.headhunter.full_name} de #{self.headhunter.startup.name} est rentré en contact avec #{self.talent.full_name}")
    end

    def accepeted_a_notification
      Notification.create(title: "#{self.talent.full_name} a accepté de rentrer en contact avec #{self.headhunter.full_name} de #{self.headhunter.startup.name} ")
    end

    def refused_a_notification
      Notification.create(title: "#{self.talent.full_name} a refusé de rentrer en contact avec #{self.headhunter.full_name} de #{self.headhunter.startup.name} ")
    end
end
