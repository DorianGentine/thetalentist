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
  validates :name, :firstname, :city, :email, presence: true

  geocoded_by :city
  after_validation :geocode

  after_create :send_welcome_email, :send_new_user_to_talentist
  before_save :capitalize_name_firstname, :save_completed_profil


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
  accepts_nested_attributes_for :technos, allow_destroy: true, reject_if: :all_blank

  has_many :talent_hobbies, dependent: :destroy
  has_many :hobbies, through: :talent_hobbies
  accepts_nested_attributes_for :hobbies, reject_if: :all_blank

  # relation one to many
  has_many :credentials, dependent: :destroy

  has_many :experiences, dependent: :destroy
  accepts_nested_attributes_for :experiences, allow_destroy: true, reject_if: proc { |att| att['position'].blank? }

  has_many :next_aventures, dependent: :destroy
  accepts_nested_attributes_for :next_aventures, allow_destroy: true, reject_if: :all_blank


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
  # mount_uploader :cv, PdfUploader
  mount_uploader :photo, PhotoUploader
  process_in_background :photo

  scope :his_job_is, -> (job) { joins(:jobs).merge(Job.where(title: job)) }
  # scope :is_comming_to, -> (point) { where( point: point, invited: true, status: "I'm in") }
  # scope :activity_title, -> (current_title) { joins(:user_activity).merge(UserActivity.by_activity_title(current_title)) }

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
    ApplicationMailer.new_user("talent", self.id).deliver_later
  end

  def new_message(message, receveur)
    ApplicationMailer.new_message("talent", message, receveur.id, self.id).deliver_later
  end

  def send_invitation(headhunter)
    TalentMailer.invited(self.id, headhunter.id).deliver_later
  end

  def send_candidate_and_user_information
    TalentMailer.candidate(self.id).deliver_later(wait_until: Date.tomorrow.noon)
    TalentMailer.pdf_of_user_information(self.id).deliver_later(wait_until: Date.tomorrow.noon + 1.hour)
  end

  def send_welcome_email
    ApplicationMailer.welcome("talent", self.id).deliver_later
  end

  def send_refused
    TalentMailer.refused(self.id).deliver_later
  end

  def send_accepted
    TalentMailer.accepted(self.id).deliver_later
  end

  def completed_totaly
    if self.completed_profil != nil &&  self.completed_formation_skill_language != nil &&  self.completed_experience != nil &&  self.completed_next_aventures != nil &&
      all_parts = self.completed_profil + self.completed_formation_skill_language + self.completed_experience + self.completed_next_aventures
      result = all_parts / 4.0
      return result.round(1)
    else
      return 0
    end
  end

  def completed_profil
    count = 0
    value_input = stat(8)
    self.firstname.present? ? count += value_input : count
    self.name.present? ? count += value_input : count
    self.photo? ? count += value_input : count
    self.phone.present? ? count += value_input : count
    self.city.present? ? count += value_input : count
    self.linkedin.present? ? count += value_input : count
    self.jobs.first.present? ? count += value_input : count
    if self.talent_jobs.first.present?
      self.talent_jobs.first.year.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_formation_skill_language
    count = 0
    formation_count = self.talent_formations.size * 4
    language_count = self.talent_languages.size * 2
    skills_count = self.talent_skills.size * 1
    value_input = stat(formation_count + language_count + skills_count)
    if self.talent_formations.count > 0
      self.talent_formations.each do |talent_formation|
        talent_formation.formation_id.present? ? count += value_input : count
        talent_formation.year.present? ? count += value_input : count
        talent_formation.title.present? ? count += value_input : count
        # talent_formation.level.present? ? count += value_input : count
        talent_formation.type_of_formation.present? ? count += value_input : count
      end
    end
    if self.talent_languages.count > 0
      self.talent_languages.each do |talent_language|
        talent_language.language_id.present? ? count += value_input : count
        talent_language.level.present? ? count += value_input : count
      end
    end
    if self.talent_skills.count > 0
      self.talent_skills.each do |talent_skill|
        talent_skill.skill_id.present? ? count += value_input : count
        # talent_skill.level.present? ? count += value_input : count
      end
    end
    return count.round(0)
  end
  def completed_experience
    count = 0
    experiences_count = self.experiences.size * 6
    value_input = stat(experiences_count)
    self.experiences.each do |experience|
      experience.position.present? ? count += value_input : count
      experience.starting.present? ? count += value_input : count
      experience.currently || experience.years.present? ? count += value_input : count
      experience.overview.present? ? count += value_input : count
      experience.company_name.present? ? count += value_input : count
      experience.company_type_id.present? ? count += value_input : count
    end
    return count.round(0)
  end

  def completed_next_aventures
    count = 0
    next_aventure_count = self.next_aventures.size * 15
    small_plu_count = self.your_small_plus.size * 1
    # skills_count = self.talent_skills.size * 1
    value_input = stat(next_aventure_count + small_plu_count)
    self.next_aventures.each do |next_aventure|
      next_aventure.city.present? ? count += value_input : count
      next_aventure.contrat.present? ? count += value_input : count
      next_aventure.remuneration.present? ? count += value_input : count
      next_aventure.sector_ids.count > 0 ? count += value_input : count
      next_aventure.btob || next_aventure.btoc ? count += value_input : count
      next_aventure.availability.present? ? count += value_input : count
      next_aventure.waiting_for_one.present? ? count += value_input : count
      next_aventure.waiting_for_two.present? ? count += value_input : count
      next_aventure.waiting_for_three.present? ? count += value_input : count
      next_aventure.hunter_or_breeder.present? ? count += value_input : count
      next_aventure.creative_or_pragmatic.present? ? count += value_input : count
      next_aventure.dream.present? ? count += value_input : count
      next_aventure.famous_person.present? ? count += value_input : count
      next_aventure.good_manager.present? ? count += value_input : count
      next_aventure.work_for_free.present? ? count += value_input : count
    end
    if self.your_small_plus.count > 0
      self.your_small_plus.each do |your_small_plu|
        your_small_plu.description.present? ? count += value_input : count
      end
    end
    return count.round(0)
  end

  def save_completed_profil
    self.completing = self.completed_totaly
  end

  def pass_from_cv_to_completing
    if self.completing.nil?
      self.cv.to_i
    else
      self.completing
    end
  end

  # mettre en place un background pour calculer les stat
  # def async_update
  #   p "tu rentre dans le job"
  #   StatisticJob.perform_now(self.id)
  # end

  private



  def stat(arg)
    length_input = arg
    total_completed = 100.00
    value_input = total_completed / length_input
  end

  def normalize_name_firstname
    self.firstname = self.firstname.capitalize
  end

end
