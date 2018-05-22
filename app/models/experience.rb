class Experience < ApplicationRecord
  belongs_to :talent

  validates :position, presence: true
  validates :company_name, presence: true
  validates :starting, presence: true


end
