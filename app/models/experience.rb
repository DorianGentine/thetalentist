class Experience < ApplicationRecord
  belongs_to :talent
  belongs_to :company_type, optional: true
  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :company_type, :reject_if => :all_blank


  validates_presence_of :position, message: "Ajoute l'intituler de ton poste", unless: :skip_position_validation
  validates_presence_of :company_name, message: "Ajoute le nom de l'entreprise", unless: :skip_company_name_validation
  validates_presence_of :starting, message: "Ajoute une date de début", unless: :skip_starting_validation
  validates :starting, format: { with: /\d{2}-\d{4}/, message: "La date doit être XX-XXXX" }, unless: :skip_starting_validation
  validates :years, presence: true, format: { with: /\d{2}-\d{4}/, message: "date must be like 10-2015" }, if: :currently_is_on? && :years_is_bigger_than_starting_date?
  validates_presence_of :currently, if: :years_is_on?, message: "Poste actuel ?", unless: :skip_currently_validation


  attr_accessor :skip_position_validation,
  :skip_company_name_validation,
  :skip_starting_validation,
  :skip_currently_validation


  def nothing_to_save
    if self.position.blank? && self.starting.blank? && self.company_name.blank?
      self.destroy
    end
  end

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



