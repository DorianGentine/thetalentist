class UserInfoPdf < Prawn::Document

  def initialize(user)
    @user = user
    super(top_margin: 70)
    user_title
    tableaux
  end

  def user_title
    text "----- The Talentist -----", size: 20, style: :bold, :align => :center
    text "Informations enregistrées de #{@user.firstname} #{@user.last_name}", size: 15, style: :bold, :align => :center
  end
  def info_general(array)
    move_down 20
    font_size 9
    table array do
      row(0).font_style = :bold
      columns(4).align = :center
      columns(1..3).align = :left
      self.row_colors = ["DDDDDD", "FFFFFF"]
      self.header = true
    end
  end

  def tableaux
    info_general(line_profil_rows)
    info_general(line_experience_rows)
    info_general(line_formation_rows)
    info_general(line_skill_rows)
    info_general(line_language_rows)
    info_general(line_next_aventure_rows)
  end

  def line_profil_rows
    [["Talent"]] +
    [["Nom:", present?(@user.last_name)]] +
    [["Prenom:", present?(@user.firstname)]] +
    [["Email:", present?(@user.email)]] +
    [["Password:", "confidentiel"]] +
    [["Adresse:", present?(@user.city)]] +
    [["Téléphone:", present?(@user.phone)]] +
    [["Linkedin:", present?(@user.linkedin)]] +
    [["Cv:", present?(@user.completing)]] +
    [["Btob:", its_true?(@user.btob)]] +
    [["Btoc:", its_true?(@user.btoc)]] +
    [["Photo:", present?(@user.photo)]]
  end

  def line_next_aventure_rows
    next_aventure = @user.next_aventures.first
    [["Ma prochaine avanture"]] +
    [["Ville:", present?(next_aventure.city)]] +
    [["Contrat:", present?(next_aventure.contrat)]] +
    [["Rémuneration:", present?(next_aventure.remuneration)]] +
    [["Secteur:", next_aventure.sectors.first.present? ? present?(next_aventure.sectors.first.title) : "false"]] +
    [["Attente n°1:", present?(next_aventure.waiting_for_one)]] +
    [["Attente n°2:", present?(next_aventure.waiting_for_two)]] +
    [["Attente n°3:", present?(next_aventure.waiting_for_three)]] +
    [["Btob:", its_true?(next_aventure.btob)]] +
    [["Btoc:", its_true?(next_aventure.btoc)]] +
    [["Disponible:", its_true?(next_aventure.available)]] +
    [["Je suis haunter à:", "#{present?(next_aventure.hunter_or_breeder)}%"]] +
    [["Je suis créatif à:", "#{present?(next_aventure.creative_or_pragmatic)}%"]] +
    [["Le rêve que je remets à demain:", present?(next_aventure.dream)]] +
    [["La personne qui m'inspire:", present?(next_aventure.famous_person)]] +
    [["Un bon manager c'est:", present?(next_aventure.good_manager)]] +
    [["Le travail effectué gratuitement serai:", present?(next_aventure.work_for_free)]]
  end

  def line_experience_rows
    [["Entreprise","Type d'entreprise", "Position", "Années", "En poste", "Résumé"]] +
    @user.experiences.map do |experience|
      [
      experience.company_name.present? ? present?(experience.company_name) : "False",
      experience.company_type.present? ? present?(experience.company_type.title) : "False",
      experience.position.present? ? present?(experience.position) : "False",
      "#{present?(experience.starting)} / #{present?(experience.years)}",
      its_true?(experience.currently),
      present?(experience.overview)
      ]
    end
  end

  def line_formation_rows
    [["Formation", "Type", "Années", "Diplome"]] +
    @user.talent_formations.map do |formation|
      [
      formation.formation.present? ? present?(formation.formation.title) : "False",
      present?(formation.type_of_formation),
      present?(formation.year),
      present?(formation.title)
      ]
    end
  end
  def line_skill_rows
    [["Compétence", "Niveau"]] +
    @user.talent_skills.map do |skill|
      [
      skill.skill.present? ? present?(skill.skill.title) : "False",
      present?(skill.level)
      ]
    end
  end

  def line_language_rows
    [["Languge", "Niveau"]] +
    @user.talent_languages.map do |language|
      [
      language.language.present? ? present?(language.language.title) : "False",
      present?(language.level)
      ]
    end
  end

  def present?(arg)
    if arg.present?
      arg
    else
      "nil"
    end
  end

  def its_true?(arg)
    if arg
      'True'
    else
      'False'
    end
  end
end

