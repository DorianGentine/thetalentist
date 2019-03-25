class Relationship < ApplicationRecord
  belongs_to :talent, optional: true
  belongs_to :headhunter, optional: true
  belongs_to :talentist, optional: true

  before_destroy :destroy_conversation

  def destroy_conversation
    conversations = self.talent.mailbox.conversations

    conversations.each do |conversation|
      participant = (conversation.participants - [self.talent]).first
      if participant == self.headhunter
        conversation.destroy
      end
    end
  end
end
