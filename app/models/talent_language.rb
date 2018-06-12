class TalentLanguage < ApplicationRecord
  belongs_to :language
  belongs_to :talent

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :language, :reject_if => :all_blank
end
