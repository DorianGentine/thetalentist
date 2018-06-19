class StartupWord < ApplicationRecord
  belongs_to :startup
  belongs_to :word

  accepts_nested_attributes_for :startup, :reject_if => :all_blank, allow_destroy: true
  accepts_nested_attributes_for :word, :reject_if => :all_blank, allow_destroy: true
end
