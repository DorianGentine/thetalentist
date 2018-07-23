class Experience < ApplicationRecord
  belongs_to :talent
  belongs_to :company_type
  belongs_to :company_name

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :company_type, :reject_if => :all_blank
  accepts_nested_attributes_for :company_name, :reject_if => :all_blank

  validates :position, presence: true
  validates :company_type, presence: true

end
