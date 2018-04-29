class Credential < ApplicationRecord
  belongs_to :talent

  validates :company_name, presence: true
  validates :name, presence: true
  validates :email, presence: true   # , format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
  validates :name, presence: true

end
