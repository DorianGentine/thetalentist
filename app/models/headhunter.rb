class Headhunter < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :startup
  accepts_nested_attributes_for :startup

  has_many :relationships, dependent: :destroy
  has_many :talents, through: :relationships

  has_many :headhunter_messages, dependent: :destroy
  # has_many :relationships, through: :headhunter_messages



  validates :firstname, presence: true
  validates :job, presence: true


end
