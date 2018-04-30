p "Destroy Talent"

Talent.destroy_all
Formation.destroy_all
Known.destroy_all
Skill.destroy_all
Keyword.destroy_all
Language.destroy_all
Techno.destroy_all

Experience.destroy_all
Credential.destroy_all
NextAventure.destroy_all

TalentFormation.destroy_all
TalentKnown.destroy_all
TalentSkill.destroy_all
TalentKeyword.destroy_all
TalentLanguage.destroy_all
TalentTechno.destroy_all

p "Creating talents"

luc = Talent.create!(email: "luc@hotmail.fr", password: "password", firstname: "luc", name: "buisson", city: "strabourg", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: false, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")
donatien = Talent.create!(email: "donatien@hotmail.fr", password: "password", firstname: "donatien", name: "rolland", city: "nantes", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")
dorian = Talent.create!(email: "dorian@hotmail.fr", password: "password", firstname: "dorian", name: "gentine", city: "lille", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:false, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")

    p "Created #{Talent.count} talents"

p "Creating credentials for Henri"

marc_from_backmarket = Credential.create(firstname: "marc", company_name: "backmarket", name: "gesneau", email: "marc@hotmail.fr", phone: "0786019941")
louise_from_backmarket = Credential.create(firstname: "louise", company_name: "blablacar", name: "martin", email: "louise@hotmail.fr", phone: "0786019941")
adrien_from_backmarket = Credential.create(firstname: "adrien", company_name: "desbrasenplus", name: "moison", email: "adrien@hotmail.fr", phone: "0786019941")
jules_from_manomano = Credential.create(firstname: "jules", company_name: "desbrasenplus", name: "martin", email: "jules@hotmail.fr", phone: "0786019941")
nathan_from_agricool = Credential.create(firstname: "nathan", company_name: "desbrasenplus", name: "barbier", email: "nathan@hotmail.fr", phone: "0786019941")

marc_from_backmarket.talent = luc
louise_from_backmarket.talent = donatien
adrien_from_backmarket.talent = dorian
jules_from_manomano.talent = donatien
nathan_from_agricool.talent = luc

marc_from_backmarket.save!
louise_from_backmarket.save!
adrien_from_backmarket.save!
jules_from_manomano.save!
nathan_from_agricool.save!

p "Creating experiences for Henri"

data_analyst = Experience.new( position: "Data analyste", company_name: "valeo", link:"https://www.valeo.com/fr/", years:"2015 - 2017", currently: false, overview: "Valeo est un équipementier automobile, partenaire de tous les constructeurs dans le monde. Entreprise technologique, Valeo propose des systèmes et équipements innovants permettant la réduction des émissions de CO2 et le développement de la conduite intuitive.")
data_scientist = Experience.new( position: "data scientist", company_name: "uber", link:"https://www.uber.com/", years:"2017", currently: true, overview: "Uber, anciennement UberCab, est une entreprise technologique américaine qui développe et exploite des applications mobiles de mise en contact d'utilisateurs avec des conducteurs réalisant des services de transport.")
data_owner = Experience.new( position: "data owner", company_name: "blablacar", link:"https://www.backmarket.com/", years:"2012 2015", currently: false, overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")

data_analyst.talent = luc
data_owner.talent = donatien
data_scientist.talent = dorian

data_analyst.save!
data_scientist.save!
data_owner.save!

p "Creating formations"

hec = Formation.create( title: "HEC")
icam = Formation.create( title: "Icam")
agroparistech = Formation.create( title: "AgroParisTech")
audencia = Formation.create( title: "Audencia")
celsa = Formation.create( title: "CELSA")
centrale_lyon = Formation.create( title: "Centrale Lyon")
centrale_paris = Formation.create( title: "Centrale Paris")
dauphine = Formation.create( title: "Dauphine")
ecole_42 = Formation.create( title: "Ecole 42")
ensae = Formation.create( title: "ENSAE")
edhec = Formation.create( title: "EDHEC")
em_lyon = Formation.create( title: "EM Lyon")
ens = Formation.create( title: "ENS")
escp_europe = Formation.create( title: "ESCP Europe")
agroparistech = Formation.create( title: "AgroParisTech")

p "Creating talent_formations"

luc_formation = TalentFormation.new(year: "2013-2015", title:"Master en data analysit")
donatien_formation = TalentFormation.new(year: "2011", title:"Master en data owner et product manager for startups and SMB")
dorian_formation = TalentFormation.new(year: "2009 2014", title:"Master en data scientist")

luc_formation.talent = luc
donatien_formation.talent = donatien
dorian_formation.talent = dorian

luc_formation.formation = icam
donatien_formation.formation = hec
dorian_formation.formation = audencia

luc_formation.save!
donatien_formation.save!
dorian_formation.save!

p "Creating keywords"

motiver = Keyword.create(title: "motiver")
aimable = Keyword.create(title: "aimable")
actif = Keyword.create(title: "actif")
communicatif = Keyword.create(title: "communicatif")
intuitif = Keyword.create(title: "intuitif")

p "Creating talent_keywords"

luc_keyword_motiver = TalentKeyword.new()
luc_keyword_com = TalentKeyword.new()
donatien_keyword_aimable = TalentKeyword.new()
donatien_keyword_motiver = TalentKeyword.new()
dorian_keyword_actif = TalentKeyword.new()
dorian_keyword_intuitif = TalentKeyword.new()

luc_keyword_motiver.talent = luc
luc_keyword_com.talent = luc
donatien_keyword_aimable.talent = donatien
donatien_keyword_motiver.talent = donatien
dorian_keyword_actif.talent = dorian
dorian_keyword_intuitif.talent = dorian

luc_keyword_motiver.keyword = motiver
luc_keyword_com.keyword = communicatif
donatien_keyword_aimable.keyword = aimable
donatien_keyword_motiver.keyword = motiver
dorian_keyword_actif.keyword = actif
dorian_keyword_intuitif.keyword = intuitif

luc_keyword_motiver.save!
luc_keyword_com.save!
donatien_keyword_motiver.save!
donatien_keyword_aimable.save!
dorian_keyword_actif.save!
dorian_keyword_intuitif.save!

p "Creating knowns"

bouche_a_oreille = Known.create(title: "Bouche à oreille")
facebook = Known.create(title: "facebook")
twitter = Known.create(title: "Twitter")
linkedin = Known.create(title: "Linkedin")
evenement = Known.create(title: "Evénement")

p "Creating talent_knowns"

luc_known = TalentKnown.new
donatien_known = TalentKnown.new
dorian_known = TalentKnown.new

luc_known.talent = luc
donatien_known.talent = donatien
dorian_known.talent = dorian

luc_known.known = bouche_a_oreille
donatien_known.known = facebook
dorian_known.known = evenement

luc_known.save!
donatien_known.save!
dorian_known.save!

p "Creating languages"

english = Language.create(title: "english")
francais = Language.create(title: "Francais")
spanish = Language.create(title: "spanish")
german = Language.create(title: "german")


p "Creating talent_languages"

luc_language = TalentLanguage.new(level: 3)
donatien_language = TalentLanguage.new(level: 4)
dorian_language = TalentLanguage.new(level: 2)

luc_language.talent = luc
donatien_language.talent = donatien
dorian_language.talent = dorian

luc_language.language = english
donatien_language.language = francais
dorian_language.language = german

luc_language.save!
donatien_language.save!
dorian_language.save!

p "Creating next_aventures"

manger = NextAventure.create(city: "paris", contrat:"cdi", remuneration: "2000 - 3000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
data = NextAventure.create(city: "bordeux", contrat:"cdd", remuneration: "10000 - 15000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis. Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", available: false)
sales = NextAventure.create(city: "normandie", contrat:"cdi", remuneration: "4000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)

manger.talent = luc
data.talent = donatien
sales.talent = dorian

manger.save!
data.save!
sales.save!

p "Creating sectors"

data = Sector.create(title: "Data", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
sales = Sector.create(title: "Sales", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
product = Sector.create(title: "Product", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
market = Sector.create(title: "Market", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")


p "Creating talent_sectors"

luc_sector = TalentSector.new
donatien_sector = TalentSector.new
dorian_sector = TalentSector.new

luc_sector.talent = luc
donatien_sector.talent = donatien
dorian_sector.talent = dorian

luc_sector.sector = data
donatien_sector.sector = data
dorian_sector.sector = data

luc_sector.save!
donatien_sector.save!
dorian_sector.save!

p "Creating skills"

statistiques = Skill.create(title: "statistiques")
outils_analytiques = Skill.create(title: "outils analytiques")
programmation = Skill.create(title: " langages de programmation")
hadoop = Skill.create(title: "Hadoop")
logiciel = Skill.create(title: "ingénierie logicielle")

p "Creating talent_skills"

luc_skills_stat = TalentSkill.new(level: 4)
luc_skills_oa = TalentSkill.new(level: 4)
donatien_skills_prog = TalentSkill.new(level: 2)
donatien_skills_hado = TalentSkill.new(level: 2)
dorian_skills_log = TalentSkill.new(level: 1)
dorian_skills_hado = TalentSkill.new(level: 1)

luc_skills_stat.talent = luc
luc_skills_oa.talent = luc
donatien_skills_prog.talent = donatien
donatien_skills_hado.talent = donatien
dorian_skills_log.talent = dorian
dorian_skills_hado.talent = dorian

luc_skills_stat.skill = statistiques
luc_skills_oa.skill = outils_analytiques
donatien_skills_prog.skill = programmation
donatien_skills_hado.skill = hadoop
dorian_skills_log.skill = logiciel
dorian_skills_hado.skill = hadoop

luc_skills_stat.save!
luc_skills_oa.save!
donatien_skills_prog.save!
donatien_skills_hado.save!
dorian_skills_log.save!
dorian_skills_hado.save!

p "Creating technos"

digital = Techno.create(title: "Digital")
php = Techno.create(title: "php")
ruby = Techno.create(title: "ruby")
sql = Techno.create(title: "sql")

p "Creating talent_technos"

luc_technos_dig = TalentTechno.new
luc_technos_php = TalentTechno.new
donatien_technos_ruby = TalentTechno.new
donatien_technos_sql = TalentTechno.new
dorian_technos_dig = TalentTechno.new
dorian_technos_sql = TalentTechno.new

luc_technos_dig.talent = luc
luc_technos_php.talent = luc
donatien_technos_ruby.talent = donatien
donatien_technos_sql.talent = donatien
dorian_technos_dig.talent = dorian
dorian_technos_sql.talent = dorian

luc_technos_dig.techno = digital
luc_technos_php.techno = php
donatien_technos_ruby.techno = ruby
donatien_technos_sql.techno = sql
dorian_technos_dig.techno = digital
dorian_technos_sql.techno = sql

luc_technos_dig.save!
luc_technos_php.save!
donatien_technos_ruby.save!
donatien_technos_sql.save!
dorian_technos_dig.save!
dorian_technos_sql.save!


p "Creating Startup part"


