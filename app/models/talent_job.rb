class TalentJob < ApplicationRecord
  belongs_to :talent
  belongs_to :job

  validates_presence_of :year, message: "L'année doit être remplit", unless: :skip_year_validation
  validates_presence_of :job_id, message: "doit être remplit"

  attr_accessor :skip_year_validation

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :job, :reject_if => :all_blank
end
