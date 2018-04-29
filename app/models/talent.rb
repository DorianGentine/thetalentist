class Talent < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :talent_formation, dependent: :destroy
  has_many :talent_keyword, dependent: :destroy
  has_many :talent_known, dependent: :destroy
  has_many :talent_language, dependent: :destroy
  has_many :talent_sector, dependent: :destroy
  has_many :talent_skill, dependent: :destroy
  has_many :talent_techno, dependent: :destroy
  has_many :credential, dependent: :destroy
  has_many :experience, dependent: :destroy
  has_many :next_aventure, dependent: :destroy

  validates :name, presence: true
  validates :firstname, presence: true
  validates :city, presence: true
  validates :phone, presence: true
  validates :email, presence: true

end
