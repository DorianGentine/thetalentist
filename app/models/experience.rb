class Experience < ApplicationRecord
  belongs_to :talent
  accepts_nested_attributes_for :talent, :reject_if => :all_blank

  validates :position, presence: true
  validates :company_name, presence: true

end
