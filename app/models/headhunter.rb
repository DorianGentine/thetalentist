class Headhunter < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :startup
  accepts_nested_attributes_for :startup

  has_many :relationships, dependent: :destroy
  has_many :talents, through: :relationships
  has_many :talentists, through: :relationships

  has_many :job_alertes, dependent: :destroy
  has_many :jobs, through: :job_alertes
  accepts_nested_attributes_for :job_alertes, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :jobs, allow_destroy: true, reject_if: :all_blank

  # for mailboxer
  acts_as_messageable


  validates :firstname, presence: true
  validates :job, presence: true

  def mailboxer_email(object)
   #return the model's email here
  end

  def is_connected_to?(talent)
    Relationship.where("headhunter_id = ? AND talent_id = ?", self.id, talent.id).size > 0
  end

  def notif_of_unread
    conversations = self.mailbox.conversations
    @unread_conversations = []
    conversations.each do |conversation|
      if conversation.is_unread?(self)
        @unread_conversations << conversation
      end
    end
  end

  def count_unread_message
    unreads = []
    messages = Mailboxer::Receipt.where(receiver_id: self.id)
    messages.each do |message|
      if message.is_unread?
        unreads << message
      end
    end
    unreads.count
  end
end

