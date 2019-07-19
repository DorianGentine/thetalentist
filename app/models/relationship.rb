class Relationship < ApplicationRecord
  belongs_to :talent, optional: true
  belongs_to :headhunter, optional: true
  belongs_to :talentist, optional: true

  before_destroy :destroy_conversation

  after_create :create_a_notofication
  after_save :modification_status_notification

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
        accepeted_a_notofication
      elsif self.status == "Refuser"
        refused_a_notofication
      end
    end

    def create_a_notofication
      Notification.create(title: "#{self.headhunter.full_name} de #{self.headhunter.startup.name} est rentré en contact avec #{self.talent.full_name}")
    end

    def accepeted_a_notofication
      Notification.create(title: "#{self.talent.full_name} à accepté de rentrer en contact avec #{self.headhunter.full_name} de #{self.headhunter.startup.name} ")
    end

    def refused_a_notofication
      Notification.create(title: "#{self.talent.full_name} à refuser de rentrer en contact avec #{self.headhunter.full_name} de #{self.headhunter.startup.name} ")
    end
end
