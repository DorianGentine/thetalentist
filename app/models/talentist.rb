class Talentist < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :relationships, dependent: :destroy
  has_many :headhunters, through: :relationships
  has_many :talents, through: :relationships

  # for mailboxer
  acts_as_messageable
  before_destroy { Mailboxer::Conversation.destroy_all }

  before_save :capitalize_name_firstname

  mount_uploader :photo, PhotoUploader

  def capitalize_name_firstname
    self.name = self.name.capitalize if self.name && !self.name.blank?
    self.firstname = self.firstname.capitalize if self.firstname && !self.firstname.blank?
  end

  def new_message(message, receveur)
    ApplicationMailer.new_message(message, receveur, self).deliver_later
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
