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

  validates :name, :firstname, :job, :email, :terms_of_condition, presence: true

  after_create :send_welcome_email, :send_new_user_to_talentist
  before_save :capitalize_name_firstname

  mount_uploader :photo, PhotoUploader

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

  def completed_totaly
    all_parts = self.completed_profil + self.completed_pictures + self.completed_startup
    result = all_parts / 3.0
    return result.round(1)
  end

  def completed_profil
    count = 0
    headhunters_count = self.startup.headhunters.size * 4
    value_input = stat(headhunters_count + 7)
    self.startup.headhunters.each do |headhunter|
      headhunter.firstname.present? ? count += value_input : count
      headhunter.name.present? ? count += value_input : count
      headhunter.job.present? ? count += value_input : count
      headhunter.photo? ? count += value_input : count
    end
    self.startup.name.present? ? count += value_input : count
    self.startup.logo? ? count += value_input : count
    self.startup.link.present? ? count += value_input : count
    self.startup.address.present? ? count += value_input : count
    self.startup.short_resume.present? ? count += value_input : count
    self.startup.linkedin.present? ? count += value_input : count
    self.startup.facebook.present? ? count += value_input : count
    return count.round(0)
  end

  def completed_pictures
    count = 0
    pictures_count = self.startup.pictures.size * 1
    value_input = stat(pictures_count)
    self.startup.pictures.each do |picture|
      picture.photo? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_startup
    count = 0
    value_input = stat(8)
    self.startup.year_of_creation.present? ? count += value_input : count
    self.startup.sectors.first.present? ? count += value_input : count
    self.startup.collaborators.present? ? count += value_input : count
    self.startup.btoc || self.startup.btob ? count += value_input : count
    self.startup.average_age.present? ? count += value_input : count
    self.startup.words.present? ? count += value_input : count
    self.startup.overview.present? ? count += value_input : count
    self.startup.mission.present? ? count += value_input : count

    return count.round(0)
  end

  def send_new_user_to_talentist
    ApplicationMailer.new_user(self).deliver_now
  end

  def send_relation(talent, status)
    HeadhunterMailer.in_relation(self, talent, status).deliver_now
  end

  def send_welcome_email
    ApplicationMailer.welcome(self).deliver_now
  end

  def new_message(message, receveur)
    ApplicationMailer.new_message(message, receveur, self).deliver_now
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

  private
  def stat(arg)
    length_input = arg
    total_completed = 100.00
    value_input = total_completed / length_input
  end
end

