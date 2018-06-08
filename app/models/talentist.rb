class Talentist < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :relationships, dependent: :destroy
  has_many :headhunters, through: :relationships
  has_many :talents, through: :relationships

  # for mailboxer
  acts_as_messageable
end
