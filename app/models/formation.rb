class Formation < ApplicationRecord
  has_many :talent_formations, dependent: :destroy
  has_many :talents, through: :talent_formations
  accepts_nested_attributes_for :talent_formations, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :talents, allow_destroy: true, reject_if: :all_blank

  before_save :capitalize_type_and_ranking

  # scope :talent_with_no_type_of_formation, -> { where(type_of_formation: [nil, '']).joins(:talent_formations) }
  # scope :talent_with_no_ranking, -> { where("ranking LIKE ? OR ranking IS ?", '', nil).joins(:talent_formations) }

  # scope :missing_informations, -> { where('ranking IS ? OR type_of_formation IS ?', [nil, ''], [nil, ''])}


  scope :has_talents, -> { joins(:talent_formations)}
  scope :missing_informations_with_talent, -> {
    where('formations.ranking IS ? OR formations.type_of_formation IS ? OR formations.ranking = ? OR formations.type_of_formation = ?', nil, nil, '', '')
    .joins(:talent_formations).uniq
  }

  def capitalize_type_and_ranking
    self.type_of_formation = self.type_of_formation.titleize if self.type_of_formation && !self.type_of_formation.blank?
    self.ranking = self.ranking.titleize if self.ranking && !self.ranking.blank?
  end

  def all_formation_title
    formations = []
    self.all.each do |formation|
      formations << formation.new_format
    end
  end

  def is_completed?
    if self.ranking = !nil && !self.ranking.empty? && self.type_of_formation = !nil && !self.type_of_formation.empty?
      return true
    end
  end

  def new_format
    self.title.gsub("''", "@").gsub("'", "").gsub("@", "'")
  end


end
