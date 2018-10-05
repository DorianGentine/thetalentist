class YourSmallPlu < ApplicationRecord
  belongs_to :next_aventure
  before_save :capitalize_description
  accepts_nested_attributes_for :next_aventure, :reject_if => :all_blank


  def capitalize_description
    self.description.capitalize
  end
end
