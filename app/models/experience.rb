class Experience < ApplicationRecord
  belongs_to :talent
  belongs_to :company_type

  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :company_type, :reject_if => :all_blank

  validates :position, presence: true
  validates :company_name, presence: true
  validates :company_type_id, presence: true
  validates :starting, presence: true, format: { with: /\d{2}-\d{4}/, message: "date must be like 10-2015" }
  validates :years, presence: true, format: { with: /\d{2}-\d{4}/, message: "date must be like 10-2015" }, if: :currently_is_on? && :years_is_bigger_than_starting_date?
  validates :currently, presence: true, if: :years_is_on?

  def currently_is_on?
    self.currently == false
  end

  def years_is_on?
    !self.years.present?
  end

  def years_is_bigger_than_starting_date?
    if self.years.present?
      self.starting < self.years
    end
  end
end



