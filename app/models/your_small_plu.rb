class YourSmallPlu < ApplicationRecord
  belongs_to :talent
  before_save :capitalize_description
  accepts_nested_attributes_for :talent, :reject_if => :all_blank


  def capitalize_description
    self.description.capitalize
  end
end
