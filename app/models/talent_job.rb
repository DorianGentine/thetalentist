class TalentJob < ApplicationRecord
  belongs_to :talent
  belongs_to :job

  validates_presence_of :year, message: "l'année doit être remplit"
  # validates_presence_of :job_id, message: "doit être remplit"

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :job, :reject_if => :all_blank
end
