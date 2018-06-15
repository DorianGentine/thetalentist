class Talent < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise  :database_authenticatable,
          :registerable,
          :recoverable,
          :rememberable,
          :trackable,
          :validatable

  validates_confirmation_of :password

  # after_create :send_welcome_email

  # Tu devras ajouter les lignes has_many :xx through: :xx pour tous les champs que le talent devra remplir dans le questionnaire
  has_many :talent_sectors, dependent: :destroy
  has_many :sectors, through: :talent_sectors

  has_many :talent_jobs, dependent: :destroy
  has_many :jobs, through: :talent_jobs

  has_many :talent_skills, dependent: :destroy
  has_many :skills, through: :talent_skills

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
  accepts_nested_attributes_for :hobbies, allow_destroy: true, reject_if: :all_blank, allow_destroy: true

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

  # link with pdf_uploader
  mount_uploader :cv, PdfUploader
  mount_uploader :photo, PhotoUploader

  def is_connected_to?(headhunter)
    Relationship.where("headhunter_id = ? AND talent_id = ?", headhunter.id, self.id).size > 0
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

  private

  def send_welcome_email
    TalentMailer.welcome(self).deliver_now
  end


end
