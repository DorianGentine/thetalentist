class Headhunter < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_token_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :startup, optional: true
  accepts_nested_attributes_for :startup

  has_many :relationships, dependent: :destroy
  has_many :talents, through: :relationships
  has_many :talentists, through: :relationships
  has_many :view_interactions, dependent: :destroy

  has_one :headhunter_email, dependent: :destroy
  accepts_nested_attributes_for :headhunter_email

  has_many :job_alertes, dependent: :destroy
  has_many :jobs, through: :job_alertes
  accepts_nested_attributes_for :job_alertes, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :jobs, allow_destroy: true, reject_if: :all_blank

  has_many :pins, dependent: :destroy

  # for mailboxer
  acts_as_messageable
  before_destroy { self.mailbox.conversations.destroy_all }

  validates :email, :startup, presence: true
  validates_presence_of :terms_of_condition, :message => "Les conditions d'utilisations doivent être acceptées", :on => :create
  validates_presence_of :phone, :message => "Ton téléphone doit être rempli", :on => :create
  validates_presence_of :firstname, :message => "Ton prénom doit être rempli"
  validates_presence_of :last_name, :message => "Ton nom doit être rempli", :on => :create
  validates_presence_of :linkedin, :message => "Ton linkedin doit être rempli", :on => :create
  validates_format_of :linkedin, with: /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/.*$/, multiline: true, message: "Le lien ne semble pas bon", :on => :create
  validates_format_of :phone, with: /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/i, multiline: true, message: "Le numéro de téléphone n'est pas bon (06 00 00 00 00)", :on => :create

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

  def witch_status?(talent)
    re = Relationship.where(headhunter_id: self.id, talent_id: talent.id)
    return talent.is_a?(Talent) ? re[0].status : "Accepter"
  end

  def his_profession
    return "#{self.job} de #{self.startup.name}"
  end
  def avatar
    self.photo
  end

  def profil_url
    return "/headhunters/#{self.id}"
  end

  def capitalize_name_firstname
    self.last_name = self.last_name.capitalize if self.last_name && !self.last_name.blank?
    self.firstname = self.firstname.capitalize if self.firstname && !self.firstname.blank?
  end
  def full_name
    "#{self.firstname} #{self.last_name}"
  end
  def initial
    "#{self.firstname.split(//).first.upcase if !self.firstname.blank? }#{self.last_name.split(//).first.upcase if !self.last_name.blank? }"
  end

  def completing
    CompletedHeadhunter.new(self).completed_totaly
  end

  def is_a_model
    return "Recruteur"
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

  def name
    "#{firstname} #{last_name}"
  end

  def set_conversation_between(talentist)
    message = "merci pour ton inscription sur The Talentist ! Les talents t'attendent, n'hésite pas à les contacter. Si tu as la moindre question, nous sommes là pour te guider. A très vite"
    conversations = Mailboxer::Conversation.between(talentist, self)
    if conversations.size > 0
      talentist.reply_to_conversation(conversations.first, "Ravi de te revoir sur notre plateforme #{self.firstname} ! N'hésite pas si tu as des questions", nil, true, true, nil)
    else
      talentist.send_message(self, "Bonjour #{self.firstname}, #{message}", "#{self.id}")
      HeadhunterMailer.accepted(self.id).deliver_later
    end
  end

  def new_starting_set_conversation_between(talentist)
    message = "merci pour ton inscription sur The Talentist ! Les talents t'attendent, n'hésite pas à les contacter. Si tu as la moindre question, nous sommes là pour te guider. A très vite"
    conversations = Mailboxer::Conversation.between(talentist, self)
    if conversations.size == 0
      talentist.send_message(self, "Bonjour #{self.firstname}, #{message}", "#{self.id}")
    end
  end

  def send_new_user_to_talentist
    ApplicationMailer.new_user("headhunter", self.id).deliver_later
  end

  def send_relation(talent, status)
    HeadhunterMailer.in_relation(self.id, talent.id, status).deliver_later
  end

  def send_recommandation(talent)
    view_interactions.find_or_create_by(talent: talent)

    HeadhunterMailer.recommanded(self.id, talent.id).deliver_later
  end

  def send_welcome_and_reminder_email
    HeadhunterMailer.welcome(self.id).deliver_later(wait_until: 2.hours)
    # HeadhunterMailer.reminder(self.id).deliver_later(wait_until: self.created_at.next_week.tomorrow + 9.hours)
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
  def self.to_csv
    attributes = %w{id Email Nom Startup}
    CSV.generate(headers: true) do |csv|
      csv << attributes
      all.reverse_each do |headhunter|
        csv << [headhunter.id, headhunter.email, headhunter.name, headhunter.startup.name]
      end
    end
  end
end

