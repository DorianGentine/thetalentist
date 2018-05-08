class Talent < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :talent_formations, dependent: :destroy
  has_many :talent_keywords, dependent: :destroy
  has_many :talent_knowns, dependent: :destroy
  has_many :talent_languages, dependent: :destroy
  has_many :talent_skills, dependent: :destroy

  has_many :talent_technos, dependent: :destroy
  has_many :credentials, dependent: :destroy
  has_many :experiences, dependent: :destroy
  has_many :next_aventures, dependent: :destroy

  # Tu devras ajouter les lignes has_many :xx through: :xx pour tous les champs que le talent devra remplir dans le questionnaire
  has_many :talent_sectors, dependent: :destroy
  has_many :sectors, through: :talent_sectors

  validates :name, :firstname, :city, :phone, :email, presence: true

end
