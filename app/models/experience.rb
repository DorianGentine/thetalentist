class Experience < ApplicationRecord
  belongs_to :talent
  belongs_to :company_type, optional: true
  accepts_nested_attributes_for :talent, :reject_if => :all_blank
  accepts_nested_attributes_for :company_type, :reject_if => :all_blank


  validates_presence_of :position, message: "Ajoute l'intituler de ton poste", unless: :skip_position_validation
  validates_presence_of :company_name, message: "Ajoute le nom de l'entreprise", unless: :skip_company_name_validation
  validates_presence_of :starting, message: "Ajoute une date de début", unless: :skip_starting_validation
  # validates :starting, format: { with: /\d{2}-\d{4}/, message: "La date doit être XX-XXXX" }, unless: :skip_starting_validation
  # validates :years, presence: true, format: { with: /\d{2}-\d{4}/, message: "date must be like 10-2015" }, if: :currently_is_on? && :years_is_bigger_than_starting_date?
  validates_presence_of :currently, if: :years_is_on?, message: "Poste actuel ?", unless: :skip_currently_validation

  default_scope { order(currently: :DESC, years: :DESC) }

  attr_accessor :skip_position_validation,
  :skip_company_name_validation,
  :skip_starting_validation,
  :skip_currently_validation

  after_validation :date_save_format
  before_save :upcase_company_name

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

  def starting_display
    change_date_format(self.starting)
  end

  def years_display
    change_date_format(self.years)
  end

  def date_save_format
    if self.years.present?
      years = self.years.insert(0, "01-")
      self.years = DateTime.parse(years).to_date.to_s if self.years.present?
    end
    starting = self.starting.insert(0, "01-")
    self.starting = DateTime.parse(starting).to_date.to_s
  end

  def input_date_format(date)
    if date.split("-").count > 2
      new_date = date.split("-")
      return new_date[1] + "-" + new_date[0]
    else
      return date
    end
  end

  private

  def change_date_format(date)
    if date.split("-").count > 2
      new_date = DateTime.parse(date).to_date
      return new_date.strftime("%m/%y")
    else
      return date
    end
  end

  def upcase_company_name
    self.company_name = self.company_name.lstrip.upcase
  end

end



