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


  # test with relation many to many
  has_many :talent_sectors, dependent: :destroy
  has_many :sectors, through: :talent_sectors

  validates :name, :firstname, :city, :phone, :email, presence: true

  # cattr_accessor :current_user

  accepts_nested_attributes_for :talent_sectors

end
