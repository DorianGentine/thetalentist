class Talent < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise  :database_authenticatable,
          :registerable,
          :recoverable,
          :rememberable,
          :trackable,
          :validatable,
          :omniauthable, omniauth_providers: [:linkedin]

  validates_confirmation_of :password

  after_create :send_welcome_email, :send_new_user_to_talentist
  before_save :capitalize_name_firstname

  # Tu devras ajouter les lignes has_many :xx through: :xx pour tous les champs que le talent devra remplir dans le questionnaire
  has_many :talent_sectors, dependent: :destroy
  has_many :sectors, through: :talent_sectors

  has_many :your_small_plus, dependent: :destroy
  accepts_nested_attributes_for :your_small_plus, allow_destroy: true, reject_if: :all_blank

  has_many :talent_jobs, dependent: :destroy
  has_many :jobs, through: :talent_jobs
  accepts_nested_attributes_for :talent_jobs, allow_destroy: true, reject_if: :all_blank

  has_many :talent_skills, dependent: :destroy
  has_many :skills, through: :talent_skills
  accepts_nested_attributes_for :talent_skills, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :skills, allow_destroy: true, reject_if: :all_blank

  has_many :talent_formations, dependent: :destroy
  has_many :formations, through: :talent_formations
  has_many :talent_formations, inverse_of: :talent
  accepts_nested_attributes_for :talent_formations, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :formations, allow_destroy: true, reject_if: :all_blank

  has_many :talent_keywords, dependent: :destroy
  has_many :keywords, through: :talent_keywords

  has_many :talent_knowns, dependent: :destroy
  has_many :knowns, through: :talent_knowns

  has_many :talent_languages, dependent: :destroy
  has_many :languages, through: :talent_languages
  accepts_nested_attributes_for :talent_languages, allow_destroy: true, reject_if: :all_blank

  has_many :talent_technos, dependent: :destroy
  has_many :technos, through: :talent_technos

  has_many :talent_hobbies, dependent: :destroy
  has_many :talent_hobbies, inverse_of: :talent
  has_many :hobbies, through: :talent_hobbies
  accepts_nested_attributes_for :hobbies, reject_if: :all_blank

  # relation one to many
  has_many :credentials, dependent: :destroy

  has_many :experiences, dependent: :destroy
  accepts_nested_attributes_for :experiences, allow_destroy: true, reject_if: proc { |att| att['position'].blank? }

  has_many :next_aventures, dependent: :destroy
  accepts_nested_attributes_for :next_aventures, allow_destroy: true, reject_if: :all_blank

  validates :name, :firstname, :city, :phone, :email, presence: true

  # messagerie
  has_many :relationships, dependent: :destroy
  has_many :headhunters, through: :relationships
  has_many :talentists, through: :relationships

  has_many :talent_messages, dependent: :destroy
  # has_many :relationships, through: :talent_messages

  # for mailboxer
  acts_as_messageable
  before_destroy { Mailboxer::Conversation.destroy_all }

  # link with pdf_uploader
  mount_uploader :cv, PdfUploader
  mount_uploader :photo, PhotoUploader

  def is_connected_to?(headhunter)
    Relationship.where("headhunter_id = ? AND talent_id = ?", headhunter.id, self.id).size > 0
  end

  def witch_status?(headhunter)
    re = Relationship.where(headhunter_id: headhunter.id, talent_id: self.id)
    return re[0].status
  end

  def find_conversation(headhunter)
    conversations = headhunter.mailbox.conversations
    conversations.each do |conversation|
      participant = (conversation.participants - [headhunter]).first
      if participant == self
        return conversation
      end
    end

  end

  def job_is?(job)
    job_ids = []
    jobs = TalentJob.joins(:job).where(:jobs => {:title => job })
    jobs.each do |job|
      job_ids << job.id
    end
    talent = TalentJob.joins(:talent).where(:talents => { :id => self.id })
    job_ids.include?(talent[0].id)
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

  def capitalize_name_firstname
    self.name = self.name.capitalize if self.name && !self.name.blank?
    self.firstname = self.firstname.capitalize if self.firstname && !self.firstname.blank?
  end

  def self.find_for_linkedin_oauth(auth)
    talent_params = auth.slice(:provider, :uid)
    talent_params[:firstname] =  auth.info.first_name
    talent_params[:name] =  auth.info.last_name
    talent_params[:city] =  auth.info.location
    talent_params[:phone] =  "to add"
    talent_params[:linkedin] =  auth.info.urls.public_profile
    talent_params.merge! auth.info.slice(:email)
    talent_params[:photo] = auth.info.image
    talent_params[:token] = auth.credentials.token
    # talent_params[:token_expiry] = Time.at(auth.credentials.expires_at)
    talent_params = talent_params.to_h

    talent = Talent.find_by(provider: auth.provider, uid: auth.uid)
    talent ||= Talent.find_by(email: auth.info.email) # talent did a regular sign up in the past.
    if talent
      talent.update(talent_params)
    else
      talent = Talent.new(talent_params)
      talent.password = Devise.friendly_token[0,20]  # Fake password for validation
      talent.save
    end
    return talent
  end

  def update_password_with_password(params, *options)
    current_password = params.delete(:current_password)
    # raise
    result = if valid_password?(current_password)
               update_attributes(params, *options)
             else
               self.assign_attributes(params, *options)
               self.valid?
               self.errors.add(:current_password, current_password.blank? ? :blank : :invalid)
               false
             end

    clean_up_passwords
    result
  end

  def send_new_user_to_talentist
    ApplicationMailer.new_user(self).deliver_now
  end

  def new_message(message, receveur)
    ApplicationMailer.new_message(message, receveur, self).deliver_now
  end

  def send_invitation(headhunter)
    TalentMailer.invited(self, headhunter).deliver_now
  end
  def send_candidate
    TalentMailer.candidate(self).deliver_now
  end

  def send_welcome_email
    ApplicationMailer.welcome(self).deliver_now
  end

  def send_refused
    TalentMailer.refused(self).deliver_now
  end

  def send_accepted
    TalentMailer.accepted(self).deliver_now
  end

  private

  def normalize_name_firstname
    self.firstname = self.firstname.capitalize
  end

end
