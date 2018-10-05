p "Destroy Talent"

require 'csv'

Formation.destroy_all
Known.destroy_all
Skill.destroy_all
Sector.destroy_all
Job.destroy_all
Keyword.destroy_all
Language.destroy_all
Techno.destroy_all
Talent.destroy_all

Experience.destroy_all
Credential.destroy_all
NextAventure.destroy_all
CompanyType.destroy_all

TalentFormation.destroy_all
TalentKnown.destroy_all
TalentSkill.destroy_all
TalentKeyword.destroy_all
TalentLanguage.destroy_all
TalentTechno.destroy_all

Startup.destroy_all
Talentist.destroy_all
Headhunter.destroy_all
Picture.destroy_all

p "Creating The Talenist part"

dimitri = Talentist.create!(email: "donatien@rollandmail.com", password:"password", firstname: "dimitri", name:"mussat", super_admin: true)
magdalena = Talentist.create!(email: "erwan.guillou@mail.novancia.fr", password:"password", firstname: "MAGDALENA", name:"mussat", super_admin: true)

p "Creating talents"


luc = Talent.create!(city: "Paris", email: "erwan.guillou@mail.novancia.fr", password: "password", firstname: "luc", name: "buisson", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: false, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.", terms_of_condition: true)
p "#{luc}"
donatien = Talent.create!(city: "Paris", email: "donatien@rollandmail.com", password: "password", firstname: "donatien", name: "rolland", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.", terms_of_condition: true)
dorian = Talent.create!(city: "Paris", email: "dorian.gentine@mail.novancia.fr", password: "password", firstname: "dorian", name: "gentine", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:false, validated: true, visible:true ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.", terms_of_condition: true)
erwan = Talent.create!(city: "Paris", email: "erwan@avemcreation.com", password: "password", firstname: "erwan", name: "guillou", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:true, validated: true, visible:true ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.", terms_of_condition: true)
louis = Talent.create!(city: "Paris", email: "donatien.rolland@mail.novancia.fr", password: "password", firstname: "louis", name: "dupont", phone:"0786013426", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:false, validated: true, visible:true ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.", terms_of_condition: true)

dorian.photo = "https://media.licdn.com/dms/image/C4E03AQHlWPVF9-TZyg/profile-displayphoto-shrink_800_800/0?e=1533772800&v=beta&t=YtCazu0yDhrD2XJSokpVEVGjOaGKfo6TL7Eh2vjSJ80"
donatien.photo = "https://user-images.githubusercontent.com/15248524/41149564-29301e18-6b0c-11e8-954c-e63b0ad8f4eb.png"
erwan.photo = "https://media.licdn.com/dms/image/C4D03AQFn2PULZrtZww/profile-displayphoto-shrink_800_800/0?e=1533772800&v=beta&t=_FtWnk5aTFTeWJUr_bmmn-XA4vh_dDcjex6HynUBNR0"

dorian.save!
donatien.save!
erwan.save!

    p "Created #{Talent.count} talents"

p "Creating credentials"

marc_from_backmarket = Credential.create!(firstname: "marc", company_name: "backmarket", name: "gesneau", email: "marc@hotmail.fr", phone: "0786019941", talent: luc)
louise_from_backmarket = Credential.create!(firstname: "louise", company_name: "blablacar", name: "martin", email: "louise@hotmail.fr", phone: "0786019941", talent: donatien)
adrien_from_backmarket = Credential.create!(firstname: "adrien", company_name: "desbrasenplus", name: "moison", email: "adrien@hotmail.fr", phone: "0786019941", talent: dorian)
jules_from_manomano = Credential.create!(firstname: "jules", company_name: "desbrasenplus", name: "martin", email: "jules@hotmail.fr", phone: "0786019941", talent: donatien)
nathan_from_agricool = Credential.create!(firstname: "nathan", company_name: "desbrasenplus", name: "barbier", email: "nathan@hotmail.fr", phone: "0786019941", talent: luc)
florian_from_manomano = Credential.create!(firstname: "florian", company_name: "desbrasenplus", name: "martin", email: "florian@hotmail.fr", phone: "0786019941", talent: erwan)
gregoire_from_agricool = Credential.create!(firstname: "gregoire", company_name: "desbrasenplus", name: "barbier", email: "gregoire@hotmail.fr", phone: "0786019941", talent: erwan)

p "Creating Company_names"

# csv_file_entreprise   = File.join(__dir__, 'entreprises.csv')

# CSV.foreach(csv_file_entreprise) do |row|
#   if row[0]
#     entre = CompanyName.new({ title: row[0].gsub( "'", "" ) })
#     entre.save
#   end
# end

p "Creating company_type part"

ge = CompanyType.create!(title: "Grande entreprise (GE)")
eti = CompanyType.create!(title: "Entreprise de taille intermédiaire (ETI)")
pme = CompanyType.create!(title: "Petite et moyenne entreprise (PME)")
tpe = CompanyType.create!(title: "Micro entreprise (TPE)")

p "Creating experiences"

data_analyst = Experience.create!( position: "Data analyste", talent: luc, company_name: "Total", company_type_id: ge.id, link:"https://www.valeo.com/fr/", years:"2017", currently: false, starting: "2015", overview: "Valeo est un équipementier automobile, partenaire de tous les constructeurs dans le monde. Entreprise technologique, Valeo propose des systèmes et équipements innovants permettant la réduction des émissions de CO2 et le développement de la conduite intuitive.")
data_scientist = Experience.create!( position: "data scientist", talent: donatien, company_name: "Total", company_type_id: tpe.id, link:"https://www.uber.com/", currently: true, starting: "2015", overview: "Uber, anciennement UberCab, est une entreprise technologique américaine qui développe et exploite des applications mobiles de mise en contact d'utilisateurs avec des conducteurs réalisant des services de transport.")
data_owner = Experience.create!( position: "data owner", talent: dorian, company_name: "Total", company_type_id: eti.id, link:"https://www.backmarket.com/", years:"2018", currently: false, starting: "2012", overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")
data_owner = Experience.create!( position: "data owner", talent: erwan, company_name: "Total", company_type_id: ge.id, link:"https://www.backmarket.com/", years:"2018", currently: false, starting: "2014", overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")
data_analyst = Experience.create!( position: "Data analyste", talent: erwan, company_name: "Total", company_type_id: pme.id, link:"https://www.valeo.com/fr/", years:"2017", currently: false, starting: "2015", overview: "Valeo est un équipementier automobile, partenaire de tous les constructeurs dans le monde. Entreprise technologique, Valeo propose des systèmes et équipements innovants permettant la réduction des émissions de CO2 et le développement de la conduite intuitive.")
data_scientist = Experience.create!( position: "data scientist", talent: dorian, company_name: "Total", company_type_id: tpe.id, link:"https://www.uber.com/", currently: true, starting: "2015", overview: "Uber, anciennement UberCab, est une entreprise technologique américaine qui développe et exploite des applications mobiles de mise en contact d'utilisateurs avec des conducteurs réalisant des services de transport.")
data_owner = Experience.create!( position: "data owner", talent: donatien, company_name: "Total", company_type_id: ge.id, link:"https://www.backmarket.com/", years:"2018", currently: false, starting: "2015", overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")
data_owner = Experience.create!( position: "data owner", talent: luc, company_name: "Total", company_type_id: eti.id, link:"https://www.backmarket.com/", years:"2018", currently: false, starting: "2015", overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")
data_scientist = Experience.create!( position: "data scientist", talent: louis, company_name: "Total", company_type_id: pme.id, link:"https://www.uber.com/", currently: true, starting: "2015", overview: "Uber, anciennement UberCab, est une entreprise technologique américaine qui développe et exploite des applications mobiles de mise en contact d'utilisateurs avec des conducteurs réalisant des services de transport.")
data_owner = Experience.create!( position: "data owner", talent: louis, company_name: "Total", company_type_id: pme.id, link:"https://www.backmarket.com/", years:"2018", currently: false, starting: "2015", overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")
data_owner = Experience.create!( position: "data owner", talent: louis, company_name: "Total", company_type_id: ge.id, link:"https://www.backmarket.com/", years:"2018", currently: false, starting: "2015", overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")

p "Creating formations"

csv_file_school   = File.join(__dir__, 'axis_school.csv')

CSV.foreach(csv_file_school) do |row|
  if row[1]
    Formation.create!({ title: row[1].gsub("''", "@").gsub("'", "").gsub("@", "'") })
  end
end

hec = Formation.create!( title: "HEC")
icam = Formation.create!( title: "Icam")
agroparistech = Formation.create!( title: "AgroParisTech")
audencia = Formation.create!( title: "Audencia")
celsa = Formation.create!( title: "CELSA")
centrale_lyon = Formation.create!( title: "Centrale Lyon")
centrale_paris = Formation.create!( title: "Centrale Paris")
dauphine = Formation.create!( title: "Dauphine")
ecole_42 = Formation.create!( title: "Ecole 42")
ensae = Formation.create!( title: "ENSAE")
edhec = Formation.create!( title: "EDHEC")
em_lyon = Formation.create!( title: "EM Lyon")
ens = Formation.create!( title: "ENS")
escp_europe = Formation.create!( title: "ESCP Europe")
agroparistech = Formation.create!( title: "AgroParisTech")

p "Creating talent_formations"

TalentFormation.create!(year: "2013-2015", title:"Master en data analysit", talent: luc, formation: icam)
TalentFormation.create!(year: "2011", talent: donatien, formation: hec, title:"Master en data owner et product manager for startups and SMB")
TalentFormation.create!(year: "2009 2014", talent: dorian, formation: audencia, title:"Master en data scientist")
TalentFormation.create!(year: "2009 2014", talent: erwan, formation: escp_europe, title:"Master en data scientist")
TalentFormation.create!(year: "2013-2015", title:"Master en ingénierie d'affaires", talent: luc, formation: centrale_paris)
TalentFormation.create!(year: "2011", talent: donatien, formation: ecole_42, title:"Formation developpement fullstack")
TalentFormation.create!(year: "2009 2014", talent: dorian, formation: em_lyon, title:"Master startégie d'entreprise grand compte")
TalentFormation.create!(year: "2009 2014", talent: erwan, formation: agroparistech, title:"Master agro spécialiste BIO")
TalentFormation.create!(year: "2009 2014", talent: louis, formation: em_lyon, title:"Master startégie d'entreprise grand compte")
TalentFormation.create!(year: "2009 2014", talent: louis, formation: agroparistech, title:"Master agro spécialiste BIO")


p "Creating keywords"

motiver = Keyword.create!(title: "motiver")
aimable = Keyword.create!(title: "aimable")
actif = Keyword.create!(title: "actif")
communicatif = Keyword.create!(title: "communicatif")
intuitif = Keyword.create!(title: "intuitif")

p "Creating talent_keywords"

luc_keyword_motiver = TalentKeyword.create!(talent: luc, keyword: motiver)
luc_keyword_com = TalentKeyword.create!(talent: luc, keyword: communicatif)
donatien_keyword_aimable = TalentKeyword.create!(talent: donatien, keyword: aimable)
donatien_keyword_motiver = TalentKeyword.create!(talent: donatien, keyword: motiver)
dorian_keyword_actif = TalentKeyword.create!(talent: dorian, keyword: actif)
TalentKeyword.create!(talent: erwan, keyword: motiver)
TalentKeyword.create!(talent: erwan, keyword: actif)
dorian_keyword_intuitif = TalentKeyword.create!(talent: dorian, keyword: intuitif)
TalentKeyword.create!(talent: louis, keyword: motiver)
TalentKeyword.create!(talent: louis, keyword: actif)
TalentKeyword.create!(talent: erwan, keyword: aimable)
TalentKeyword.create!(talent: erwan, keyword: intuitif)

p "Creating knowns"

bouche_a_oreille = Known.create!(title: "Bouche à oreille")
facebook = Known.create!(title: "facebook")
twitter = Known.create!(title: "Twitter")
linkedin = Known.create!(title: "Linkedin")
evenement = Known.create!(title: "Evénement")

p "Creating talent_knowns"

luc_known = TalentKnown.create!(talent: luc, known: bouche_a_oreille)
donatien_known = TalentKnown.create!(talent: donatien, known: facebook)
dorian_known = TalentKnown.create!(talent: dorian, known: evenement)
TalentKnown.create!(talent: erwan, known: twitter)
TalentKnown.create!(talent: louis, known: evenement)

p "Creating languages"

csv_file_language   = File.join(__dir__, 'axis_languages.csv')

CSV.foreach(csv_file_language) do |row|
  if row[1]
    Language.create!({ title: row[1].gsub(" ","").gsub("'","").gsub(")", "").gsub(";","") })
  end
end


english = Language.first
francais = Language.second
spanish = Language.last
german = Language.first


p "Creating talent_languages"

luc_language = TalentLanguage.create!(level: 3, talent: luc, language: english)
donatien_language = TalentLanguage.create!(level: 4, talent: donatien, language: francais)
dorian_language = TalentLanguage.create!(level: 2, talent: dorian, language: german)
dorian_language2 = TalentLanguage.create!(level: 4, talent: dorian, language: spanish)
TalentLanguage.create!(level: 4, talent: erwan, language: spanish)
TalentLanguage.create!(level: 4, talent: louis, language: german)

p "Creating next_aventures"

nextluc = NextAventure.create!(city: "paris", talent: luc, contrat:"cdi", remuneration: "2000 - 3000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
nextdonatien = NextAventure.create!(city: "bordeux", talent: donatien, contrat:"cdd", remuneration: "10000 - 15000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis. Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", available: false)
nextdorian = NextAventure.create!(city: "normandie", talent: dorian, contrat:"cdi", remuneration: "4000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
nexterwan = NextAventure.create!(city: "normandie", talent: erwan, contrat:"cdi", remuneration: "8000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
nextlouis = NextAventure.create!(city: "normandie", talent: louis, contrat:"cdi", remuneration: "8000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)

p "Creating sectors"

saas = Sector.create!(title: "Saas", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
marketplace = Sector.create!(title: "Marketplace", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
iot = Sector.create!(title: "IOT", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
marketing = Sector.create!(title: "Marketing", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
finance = Sector.create!(title: "Finance", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
sante = Sector.create!(title: "Santé", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")

p "Creating next_aventure_sectors"

NextAventureSector.create!( sector: marketing, next_aventure: nextluc)
NextAventureSector.create!( sector: sante, next_aventure: nextdorian)
NextAventureSector.create!( sector: finance, next_aventure: nextdonatien)
NextAventureSector.create!( sector: saas, next_aventure: nexterwan)
NextAventureSector.create!( sector: marketplace, next_aventure: nextlouis)


p "Creating talent_sectors"

TalentSector.create!(sector: saas, year: 5, talent: luc)
TalentSector.create!(sector: marketplace, year: 3, talent: donatien)
TalentSector.create!(sector: iot, year: 8, talent: dorian)
TalentSector.create!(sector: marketplace, year: 1, talent: erwan)
TalentSector.create!(sector: saas, year: 10, talent: louis)

p "Creating jobs"

data = Job.create!(title: "Opérations")
sales = Job.create!(title: "Sales")
product = Job.create!(title: "Product")
market = Job.create!(title: "Market")

p "Creating talent_jobs"

luc_job = TalentJob.create!(talent: luc , job: data, year: 2)
donatien_job = TalentJob.create!(talent: donatien, job: data, year: 3)
dorian_job = TalentJob.create!(talent: dorian, job: market, year: 2)
TalentJob.create!(talent: erwan, job: sales, year: 9)
TalentJob.create!(talent: louis, job: product, year: 12)

p "Creating skills"

statistiques = Skill.create!(title: "statistiques")
outils_analytiques = Skill.create!(title: "outils analytiques")
programmation = Skill.create!(title: " langages de programmation")
hadoop = Skill.create!(title: "Hadoop")
logiciel = Skill.create!(title: "ingénierie logicielle")

p "Creating talent_skills"

luc_skills_stat = TalentSkill.create!(level: 4,talent: luc, skill: statistiques )
luc_skills_oa = TalentSkill.create!(level: 4, talent: luc, skill: outils_analytiques)
donatien_skills_prog = TalentSkill.create!(level: 2, talent: donatien, skill: programmation)
TalentSkill.create!(level: 4, talent: erwan, skill: outils_analytiques)
TalentSkill.create!(level: 2, talent: erwan, skill: programmation)
donatien_skills_hado = TalentSkill.create!(level: 2, talent: donatien, skill: hadoop )
dorian_skills_log = TalentSkill.create!(level: 1, talent: dorian, skill: hadoop )
dorian_skills_hado = TalentSkill.create!(level: 1, talent: dorian, skill:logiciel)
TalentSkill.create!(level: 4, talent: louis, skill: outils_analytiques)
TalentSkill.create!(level: 2, talent: louis, skill: programmation)
TalentSkill.create!(level: 4, talent: louis, skill: outils_analytiques)
TalentSkill.create!(level: 2, talent: louis, skill: programmation)

p "Creating technos"

digital = Techno.create!(title: "Digital")
php = Techno.create!(title: "php")
ruby = Techno.create!(title: "ruby")
sql = Techno.create!(title: "sql")

p "Creating talent_technos"

luc_technos_dig = TalentTechno.create!(talent: luc, techno: digital)
luc_technos_php = TalentTechno.create!(talent: luc, techno: php)
donatien_technos_ruby = TalentTechno.create!(talent: donatien, techno: ruby)
TalentTechno.create!(talent: erwan, techno: php)
TalentTechno.create!(talent: erwan, techno: ruby)
donatien_technos_sql = TalentTechno.create!(talent: donatien, techno: sql)
dorian_technos_dig = TalentTechno.create!(talent: dorian, techno: digital)
dorian_technos_sql = TalentTechno.create!(talent: dorian, techno: sql)
TalentTechno.create!(talent: louis, techno: php)
TalentTechno.create!(talent: louis, techno: ruby)

p "Creating hobbies"

Hobby.create!(title: "Voile")
Hobby.create!(title: "Boxe")
Hobby.create!(title: "Football")
Hobby.create!(title: "ski")
Hobby.create!(title: "Danse")

p "Creating words"

Word.create!(title: "Entrepreneuriat")
Word.create!(title: "RSE")
Word.create!(title: "Intraprenariat")
Word.create!(title: "Innovation")
Word.create!(title: "Esprit d’équipe")
Word.create!(title: "Intégrité")
Word.create!(title: "Respect")
Word.create!(title: "Responsabilité")
Word.create!(title: "Satisfaction Client")
Word.create!(title: "Excellence")
Word.create!(title: "Partage")


p "Creating Startup part"

backmarket = Startup.create!(name: "backmarket", year_of_creation: 2015, collaborators: 57, parity: 65, average_age: 27, turnover: 1_000_000, link: "https://www.backmarket.fr/", address: "152 bd Macdonald",overview: "Et velariis minutias ortu aut vel turpi vinariis certant fatiscunt tabernis sua pugnaciter reducto sole umbraculorum velariis aedilitate tabernis turba vinariis imitatus certant studiorum pernoctant omnium turpi imitatus concrepantes turpi.")
manomano = Startup.create!(name: "manomano", year_of_creation: 2015, collaborators: 9, parity: 69, average_age: 27, turnover: 9_000, link: "https://www.manomano.fr/", address: "152 bd Macdonald",overview: "Et velariis minutias ortu aut vel turpi vinariis certant fatiscunt tabernis sua pugnaciter reducto sole umbraculorum velariis aedilitate tabernis turba vinariis imitatus certant studiorum pernoctant omnium turpi imitatus concrepantes turpi.")
doctolib = Startup.create!(name: "doctolib", year_of_creation: 2010, collaborators: 157, parity: 52, average_age: 31, turnover: 200_000, link: "https://www.doctolib.fr/", address: "32 Rue de Monceau",overview: "Et velariis minutias ortu aut vel turpi vinariis certant fatiscunt tabernis sua pugnaciter reducto sole umbraculorum velariis aedilitate tabernis turba vinariis imitatus certant studiorum pernoctant omnium turpi imitatus concrepantes turpi.")

p "Creating Picture part"
photo1 = Picture.new(title: "open-space", startup:backmarket )
photo1.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540108/photo_startup_holidog_12.jpg"
photo1.save

photo2 = Picture.new(title: "open-space", startup:backmarket )
photo2.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540162/open-space.png"
photo2.save

photo3 = Picture.new(title: "open-space", startup:backmarket )
photo3.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540136/3025567-poster-p-1-how-to-fix-open-offices-bad-for-work-825x510.jpg"
photo3.save

photo1 = Picture.new(title: "open-space", startup:manomano )
photo1.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540108/photo_startup_holidog_12.jpg"
photo1.save

photo2 = Picture.new(title: "open-space", startup:manomano )
photo2.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540162/open-space.png"
photo2.save

photo3 = Picture.new(title: "open-space", startup:manomano )
photo3.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540136/3025567-poster-p-1-how-to-fix-open-offices-bad-for-work-825x510.jpg"
photo3.save

photo1 = Picture.new(title: "open-space", startup:doctolib )
photo1.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540108/photo_startup_holidog_12.jpg"
photo1.save

photo2 = Picture.new(title: "open-space", startup:doctolib )
photo2.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540162/open-space.png"
photo2.save

photo3 = Picture.new(title: "open-space", startup:doctolib )
photo3.remote_photo_url = "http://res.cloudinary.com/da4nnrzbu/image/upload/v1529540136/3025567-poster-p-1-how-to-fix-open-offices-bad-for-work-825x510.jpg"
photo3.save



p "Creating Headhunter part"

lucas = Headhunter.create!(email: "donatien.rolland@mail.novancia.fr", password:"password", name: "Rideau", firstname: "lucas", job:"HR", validated: true, startup: backmarket)
amelie = Headhunter.create!(email: "erwan.guillou@mail.novancia.fr", password:"password", name: "Rideau", firstname: "amelie", job:"HR data_analyst", validated: false, startup: manomano)
justine = Headhunter.create!(email: "donatien@rollandmail.com", password:"password", name: "Rideau", firstname: "justine", job:"drh", validated: true, startup: doctolib)
loic = Headhunter.create!(email: "dorian.gentine@mail.novancia.fr", password:"password", name: "Rideau", firstname: "loic", job:"rh for sales and product owner", validated: true, startup: doctolib)



dimitri.send_message(lucas, "Bonjour #{lucas.firstname}, Bienvenue sur notre plateforme!", "#{lucas.id}")
dimitri.send_message(amelie, "Bonjour #{amelie.firstname}, Bienvenue sur notre plateforme!", "#{amelie.id}")
dimitri.send_message(justine, "Bonjour #{justine.firstname}, Bienvenue sur notre plateforme!", "#{justine.id}")
dimitri.send_message(loic, "Bonjour #{loic.firstname}, Bienvenue sur notre plateforme!", "#{loic.id}")

