class Talent < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

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
  accepts_nested_attributes_for :talent_formations, allow_destroy: true

  has_many :talent_keywords, dependent: :destroy
  has_many :keywords, through: :talent_keywords

  has_many :talent_knowns, dependent: :destroy
  has_many :knowns, through: :talent_knowns

  has_many :talent_languages, dependent: :destroy
  has_many :languages, through: :talent_languages
  accepts_nested_attributes_for :talent_languages, allow_destroy: true

  has_many :talent_technos, dependent: :destroy
  has_many :technos, through: :talent_technos

  has_many :talent_hobbies, dependent: :destroy
  has_many :talent_hobbies, inverse_of: :talent
  has_many :hobbies, through: :talent_hobbies
  accepts_nested_attributes_for :hobbies, allow_destroy: true

  # relation one to many
  has_many :credentials, dependent: :destroy

  has_many :experiences, dependent: :destroy
  accepts_nested_attributes_for :experiences, allow_destroy: true, reject_if: proc { |att| att['position'].blank? }

  has_many :next_aventures, dependent: :destroy
  accepts_nested_attributes_for :next_aventures, allow_destroy: true

  validates :name, :firstname, :city, :phone, :email, presence: true



  # link with pdf_uploader
  mount_uploader :cv, PdfUploader

end
