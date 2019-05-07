class Headhunter < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :startup, optional: true
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
  before_destroy { Mailboxer::Conversation.destroy_all }

  validates :name, :firstname, :job, :email, :terms_of_condition, :startup, presence: true

  after_create :send_new_user_to_talentist
  before_save :capitalize_name_firstname

  mount_uploader :photo, PhotoUploader
  process_in_background :photo
  # store_in_background :photo


  def mailboxer_email(object)
   #return the model's email here
  end

  def is_connected_to?(talent)
    Relationship.where("headhunter_id = ? AND talent_id = ?", self.id, talent.id).size > 0
  end

  def capitalize_name_firstname
    self.name = self.name.capitalize if self.name && !self.name.blank?
    self.firstname = self.firstname.capitalize if self.firstname && !self.firstname.blank?
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



  def send_new_user_to_talentist
    ApplicationMailer.new_user("headhunter", self.id).deliver_later
  end

  def send_relation(talent, status)
    HeadhunterMailer.in_relation(self.id, talent.id, status).deliver_later
  end

  def send_welcome_and_reminder_email
    HeadhunterMailer.welcome(self.id).deliver_later(wait_until: 2.hours)
    HeadhunterMailer.reminder(self.id).deliver_later(wait_until: self.created_at.next_week.tomorrow + 9.hours)
  end

  def new_message(message, receveur)
    receveur_class = receveur.is_a?(Talent) ? "talent" : "talentist"
    ApplicationMailer.new_message("headhunter", message, receveur_class, receveur.id, self.id).deliver_later
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

