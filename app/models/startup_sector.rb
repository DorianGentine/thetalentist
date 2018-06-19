class StartupSector < ApplicationRecord
  belongs_to :startup
  belongs_to :sector

  accepts_nested_attributes_for :startup, :reject_if => :all_blank, allow_destroy: true
  accepts_nested_attributes_for :sector, :reject_if => :all_blank, allow_destroy: true
end
