class TalentJob < ApplicationRecord
  belongs_to :talent
  belongs_to :job

  validates :year, presence: { message: "doit être remplit"}

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :job, :reject_if => :all_blank
end
