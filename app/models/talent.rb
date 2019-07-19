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

  validates_confirmation_of :password, message: "Vos mots de passe ne concordent pas"

  validates_presence_of :city, :message => "Le lieu doit être rempli", unless: :skip_city_validation
  validates_presence_of :phone, :message => "Ton téléphone doit être rempli", unless: :skip_phone_validation
  validates_presence_of :linkedin, :message => "Ton linkedin doit être rempli", unless: :skip_linkedin_validation
  validates_presence_of :email, :message => "Ton email doit être rempli"
  validates_presence_of :firstname, :message => "Ton prénom doit être rempli"
  validates_presence_of :last_name, :message => "Ton nom doit être rempli"

  attr_accessor :skip_city_validation, :skip_phone_validation, :skip_linkedin_validation

  # geocoded_by :zip_code
  geocoded_by :city
  after_validation :geocode

  after_create :send_welcome_email, :send_new_user_to_talentist
  before_save :capitalize_name_firstname, :save_completed_profil

  has_many :talent_sectors, dependent: :destroy
  has_many :sectors, through: :talent_sectors

  has_many :your_small_plus, dependent: :destroy
  accepts_nested_attributes_for :your_small_plus, allow_destroy: true, reject_if: :all_blank

  validates_associated :talent_job
  has_one :talent_job, dependent: :destroy
  has_one :talent_second_job, dependent: :destroy

  # ATTENTION IL MANQUE TALENT_SECOND_JOB
  has_many :jobs, through: :talent_job, class_name:"Job"

  scope :all_with_startup, -> (name) { joins(:experiences).where(:visible => true).where(experiences: {company_name: name})}

  scope :no_startup, -> (name) { where( in_this_startup?(name) )}

  scope :his_job_is, -> (job) { joins(:jobs).merge(Job.where(title: job)) }

  def jobs
    jobs = []
    jobs << self.talent_job.job if self.talent_job.present?
    jobs << self.talent_second_job.job if self.talent_second_job.present?
    return jobs
  end

  accepts_nested_attributes_for :talent_job, allow_destroy: true
  accepts_nested_attributes_for :talent_second_job, allow_destroy: true

  has_many :talent_skills, dependent: :destroy
  has_many :skills, through: :talent_skills
  accepts_nested_attributes_for :talent_skills, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :skills, allow_destroy: true, reject_if: :all_blank

  has_many :talent_formations, dependent: :destroy
  has_many :formations, through: :talent_formations
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
  # accepts_nested_attributes_for :talent_technos, allow_destroy: true, reject_if: :all_blank
  # accepts_nested_attributes_for :technos, allow_destroy: true, reject_if: :all_blank

  has_many :talent_hobbies, dependent: :destroy
  has_many :hobbies, through: :talent_hobbies
  accepts_nested_attributes_for :hobbies, reject_if: :all_blank

  # relation one to many
  has_many :credentials, dependent: :destroy

  has_many :experiences, dependent: :destroy
  accepts_nested_attributes_for :experiences, allow_destroy: true, reject_if: :all_blank

  scope :without_same_current_startup, -> (startup) { joins(:experiences).merge(Experience.all.where.not(company_name: startup.name))}

  has_many :next_aventures, dependent: :destroy
  accepts_nested_attributes_for :next_aventures, allow_destroy: true, reject_if: :all_blank


  # messagerie
  has_many :relationships, dependent: :destroy
  has_many :headhunters, through: :relationships
  has_many :talentists, through: :relationships

  has_many :talent_messages, dependent: :destroy

  # for mailboxer
  acts_as_messageable
  before_destroy { self.mailbox.conversations.destroy_all }

  mount_uploader :photo, PhotoUploader
  process_in_background :photo

  scope :completed_less_than, -> (number) { where('completing <=  ?', number)}
  scope :have_been_never_reminded, -> { where(reminder: nil)}


  def full_name
    "#{self.firstname} #{self.last_name}"
  end

  def is_connected_to?(headhunter)
    Relationship.where("headhunter_id = ? AND talent_id = ?", headhunter.id, self.id).size > 0
  end

  def witch_status?(headhunter)
    re = Relationship.where(headhunter_id: headhunter.id, talent_id: self.id)
    return re[0].status
  end

  def is_a_model
    return "Talent"
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
    self.last_name = self.last_name.capitalize if self.last_name && !self.last_name.blank?
    self.firstname = self.firstname.capitalize if self.firstname && !self.firstname.blank?
  end

  def self.find_for_linkedin_oauth(auth)
    talent_params = auth.slice(:provider, :uid)
    talent_params[:firstname] =  auth.info.first_name
    talent_params[:last_name] =  auth.info.last_name
    talent_params.merge! auth.info.slice(:email)
    talent_params[:linkedin_picture_url] = auth.info.picture_url
    talent_params[:token] = auth.credentials.token
    talent_params[:phone] = "To fill it"
    talent_params = talent_params.to_h

    talent = Talent.find_by(provider: auth.provider, uid: auth.uid)
    talent ||= Talent.find_by(email: auth.info.email) # talent did a regular sign up in the past.
    if talent
      p "alrealdy exciste"
      talent.update(talent_params)
    else
      p "not exciste"
      talent_params[:city] =  "Paris"
      talent_params[:linkedin] =  "NA"
      talent = Talent.new(talent_params)
      talent.password = Devise.friendly_token[0,20]  # Fake password for validation
      talent.save
    end
    return talent
  end

  def send_new_user_to_talentist
    ApplicationMailer.new_user("talent", self.id).deliver_later
  end

  def new_message(message, receveur)
    receveur_class = receveur.is_a?(Headhunter) ? "headhunter" : "talentist"
    ApplicationMailer.new_message("talent", message, receveur_class, receveur.id, self.id).deliver_later
  end

  def send_invitation(headhunter)
    TalentMailer.invited(self.id, headhunter.id).deliver_later
  end

  def send_candidate_and_user_information
    TalentMailer.candidate(self.id).deliver_later(wait_until: Date.tomorrow.noon + 9.hours)
    TalentMailer.pdf_of_user_information(self.id).deliver_later(wait_until: Date.tomorrow.noon + 2.hours)
  end

  def send_welcome_email
    TalentMailer.welcome(self.id).deliver_later
  end

  def send_refused
    if self.declined.present?
      TalentMailer.refused(self.id).deliver_later
    end
  end

  def send_accepted
    TalentMailer.accepted(self.id).deliver_later
  end

  def visible_action(action)
    self.visible = action
    self.save
  end

  def validated_action(action)
    self.validated = action
    self.skip_linkedin_validation = true
  end

  def set_conversation_between(talentist)
    conversations = Mailboxer::Conversation.between(talentist, self)
    if conversations.size > 0
      talentist.reply_to_conversation(conversations.first, "Ravi de te revoir sur notre plateforme #{self.firstname} ! N'hésite pas si tu as des questions", nil, true, true, nil)
    else
      talentist.send_message(self, "Bonjour #{self.firstname}, bienvenue sur notre plateforme!", "#{self.id}")
      self.send_accepted
    end
  end

  def set_build_belong_tables
    if self.talent_formations.count == 0
      1.times { self.talent_formations.build }
    else
      0.times { self.talent_formations.build }
    end
    self.build_talent_job if self.jobs.count == 0
    self.build_talent_second_job if self.jobs.count < 2
    # if self.talent_jobs.count == 0
    #   2.times { self.talent_jobs.build }
    # elsif self.talent_jobs.count == 1
    #   1.times { self.talent_jobs.build }
    # else
    #   0.times { self.talent_jobs }
    # end
    if self.talent_languages.count == 0
      1.times { self.talent_languages.build }
    else
      0.times { self.talent_languages.build }
    end
    if self.experiences.count == 0
      1.times { self.experiences.build }
    else
      0.times { self.experiences.build }
    end
    if self.next_aventures.count == 0
      1.times { self.next_aventures.build }
    else
      0.times { self.next_aventures.build }
    end
    if self.your_small_plus.count == 0
      1.times { self.your_small_plus.build }
    else
      0.times { self.your_small_plus.build }
    end
  end

  def alerte_headhunters
    jobs = self.jobs
    jobs.each do |job|
      job_alertes = JobAlerte.where(job: job)
      headhunters = []
      if job_alertes.count > 0
        job_alertes.each do |job_alerte|
          headhunter = Headhunter.find(job_alerte.headhunter_id)
          HeadhunterMailer.alerte(headhunter.id).deliver_later
        end
      end
    end
  end

  def display_linkedin?
    if self.linkedin_picture_url.present? && self.display_linkedin_picture
      return true
    else
      return false
    end
  end

  def save_completed_profil
    self.completing = CompletedTalent.new(self).completed_totaly
  end

  # def set_new_city
  #   if self.latitude_changed?
  #     city = Geocoder.search([self.latitude, self.longitude]).first.city
  #     if city.nil?
  #       city = Geocoder.search([self.latitude, self.longitude]).first.town
  #       self.city = city
  #     else
  #       self.city = city
  #     end
  #   end
  # end

  # def city_is_filled?
  #   if self.city.present?
  #     true
  #   end
  # end
end
