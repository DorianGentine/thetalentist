class JobAlerte < ApplicationRecord
  belongs_to :headhunter
  belongs_to :job

   accepts_nested_attributes_for :headhunter, :reject_if => :all_blank, allow_destroy: true
  accepts_nested_attributes_for :job, :reject_if => :all_blank, allow_destroy: true
end
