class Mobility < ApplicationRecord
  TELETRAVAIL_MOBILITY_TYPE = 'Télétravail'

  belongs_to :next_aventure
  accepts_nested_attributes_for :next_aventure, :reject_if => :all_blank

  def remote_mobility?
    title == TELETRAVAIL_MOBILITY_TYPE
  end
end
