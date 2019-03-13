class Mobility < ApplicationRecord
  belongs_to :next_aventure
  accepts_nested_attributes_for :next_aventure, :reject_if => :all_blank

end
