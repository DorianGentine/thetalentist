# p "Destroy Talent"

Talent.destroy_all
Formation.destroy_all
Known.destroy_all
Skill.destroy_all
Sector.destroy_all
Job.destroy_all
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

Startup.destroy_all
Talentist.destroy_all
Headhunter.destroy_all

# p "Creating talents"

# luc = Talent.create!(email: "luc@hotmail.fr", password: "password", firstname: "luc", name: "buisson", city: "strabourg", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: false, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")
# donatien = Talent.create!(email: "donatien@hotmail.fr", password: "password", firstname: "donatien", name: "rolland", city: "nantes", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")
# dorian = Talent.create!(email: "dorian@hotmail.fr", password: "password", firstname: "dorian", name: "gentine", city: "lille", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:false, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")

#     p "Created #{Talent.count} talents"

# p "Creating credentials for Henri"

# marc_from_backmarket = Credential.create!(firstname: "marc", company_name: "backmarket", name: "gesneau", email: "marc@hotmail.fr", phone: "0786019941", talent: luc)
# louise_from_backmarket = Credential.create!(firstname: "louise", company_name: "blablacar", name: "martin", email: "louise@hotmail.fr", phone: "0786019941", talent: donatien)
# adrien_from_backmarket = Credential.create!(firstname: "adrien", company_name: "desbrasenplus", name: "moison", email: "adrien@hotmail.fr", phone: "0786019941", talent: dorian)
# jules_from_manomano = Credential.create!(firstname: "jules", company_name: "desbrasenplus", name: "martin", email: "jules@hotmail.fr", phone: "0786019941", talent: donatien)
# nathan_from_agricool = Credential.create!(firstname: "nathan", company_name: "desbrasenplus", name: "barbier", email: "nathan@hotmail.fr", phone: "0786019941", talent: luc)

# p "Creating experiences for Henri"

# data_analyst = Experience.new( position: "Data analyste", talent: luc, company_name: "valeo", link:"https://www.valeo.com/fr/", years:"2015 - 2017", currently: false, overview: "Valeo est un équipementier automobile, partenaire de tous les constructeurs dans le monde. Entreprise technologique, Valeo propose des systèmes et équipements innovants permettant la réduction des émissions de CO2 et le développement de la conduite intuitive.")
# data_scientist = Experience.new( position: "data scientist", talent: donatien, company_name: "uber", link:"https://www.uber.com/", years:"2017", currently: true, overview: "Uber, anciennement UberCab, est une entreprise technologique américaine qui développe et exploite des applications mobiles de mise en contact d'utilisateurs avec des conducteurs réalisant des services de transport.")
# data_owner = Experience.new( position: "data owner", talent: dorian, company_name: "blablacar", link:"https://www.backmarket.com/", years:"2012 2015", currently: false, overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")

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

# p "Creating talent_formations"

# luc_formation = TalentFormation.new(year: "2013-2015", title:"Master en data analysit")
# donatien_formation = TalentFormation.new(year: "2011", title:"Master en data owner et product manager for startups and SMB")
# dorian_formation = TalentFormation.new(year: "2009 2014", title:"Master en data scientist")

# luc_formation.talent = luc
# donatien_formation.talent = donatien
# dorian_formation.talent = dorian

# luc_formation.formation = icam
# donatien_formation.formation = hec
# dorian_formation.formation = audencia

# luc_formation.save!
# donatien_formation.save!
# dorian_formation.save!

# p "Creating keywords"

# motiver = Keyword.create(title: "motiver")
# aimable = Keyword.create(title: "aimable")
# actif = Keyword.create(title: "actif")
# communicatif = Keyword.create(title: "communicatif")
# intuitif = Keyword.create(title: "intuitif")

# p "Creating talent_keywords"

# luc_keyword_motiver = TalentKeyword.create!(talent: luc, keyword: motiver)
# luc_keyword_com = TalentKeyword.create!(talent: luc, keyword: communicatif)
# donatien_keyword_aimable = TalentKeyword.create!(talent: donatien, keyword: aimable)
# donatien_keyword_motiver = TalentKeyword.create!(talent: donatien, keyword: motiver)
# dorian_keyword_actif = TalentKeyword.create!(talent: dorian, keyword: actif)
# dorian_keyword_intuitif = TalentKeyword.create!(talent: dorian, keyword: intuitif)

# p "Creating knowns"

# bouche_a_oreille = Known.create(title: "Bouche à oreille")
# facebook = Known.create(title: "facebook")
# twitter = Known.create(title: "Twitter")
# linkedin = Known.create(title: "Linkedin")
# evenement = Known.create(title: "Evénement")

# p "Creating talent_knowns"

# luc_known = TalentKnown.create!(talent: luc, known: bouche_a_oreille)
# donatien_known = TalentKnown.create!(talent: donatien, known: facebook)
# dorian_known = TalentKnown.create!(talent: dorian, known: evenement)

# p "Creating languages"

english = Language.create(title: "english")
francais = Language.create(title: "french")
spanish = Language.create(title: "spanish")
german = Language.create(title: "german")


# p "Creating talent_languages"

# luc_language = TalentLanguage.create!(level: 3, talent: luc, language: english)
# donatien_language = TalentLanguage.create!(level: 4, talent: donatien, language: francais)
# dorian_language = TalentLanguage.create!(level: 2, talent: dorian, language: german)
# dorian_language2 = TalentLanguage.create!(level: 4, talent: dorian, language: spanish)

# p "Creating next_aventures"

# manger = NextAventure.create!(city: "paris", talent: luc, contrat:"cdi", remuneration: "2000 - 3000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
# data = NextAventure.create!(city: "bordeux", talent: donatien,contrat:"cdd", remuneration: "10000 - 15000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis. Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", available: false)
# sales = NextAventure.create!(city: "normandie", talent: dorian,contrat:"cdi", remuneration: "4000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)

p "Creating jobs"

data = Job.create(title: "Data")
sales = Job.create(title: "Sales")
product = Job.create(title: "Product")
market = Job.create(title: "Market")

p "Creating sectors"

saas = Sector.create(title: "Saas", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
marketplace = Sector.create(title: "Marketplace", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
iot = Sector.create(title: "IOT", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")

# p "Creating talent_jobs"

# luc_job = TalentJob.create!(talent: luc , job: data)
# donatien_job = TalentJob.create!(talent: donatien, job: data)
# dorian_job = TalentJob.create!(talent: dorian, job: data)

# p "Creating skills"

# statistiques = Skill.create(title: "statistiques")
# outils_analytiques = Skill.create(title: "outils analytiques")
# programmation = Skill.create(title: " langages de programmation")
# hadoop = Skill.create(title: "Hadoop")
# logiciel = Skill.create(title: "ingénierie logicielle")

# p "Creating talent_skills"

# luc_skills_stat = TalentSkill.create!(level: 4,talent: luc, skill: statistiques )
# luc_skills_oa = TalentSkill.create!(level: 4, talent: luc, skill: outils_analytiques)
# donatien_skills_prog = TalentSkill.create!(level: 2, talent: donatien, skill: programmation)
# donatien_skills_hado = TalentSkill.create!(level: 2, talent: donatien, skill: hadoop )
# dorian_skills_log = TalentSkill.create!(level: 1, talent: dorian, skill: hadoop )
# dorian_skills_hado = TalentSkill.create!(level: 1, talent: dorian, skill:logiciel)

# p "Creating technos"

# digital = Techno.create(title: "Digital")
# php = Techno.create(title: "php")
# ruby = Techno.create(title: "ruby")
# sql = Techno.create(title: "sql")

# p "Creating talent_technos"

# luc_technos_dig = TalentTechno.create!(talent: luc, techno: digital)
# luc_technos_php = TalentTechno.create!(talent: luc, techno: php)
# donatien_technos_ruby = TalentTechno.create!(talent: donatien, techno: ruby)
# donatien_technos_sql = TalentTechno.create!(talent: donatien, techno: sql)
# dorian_technos_dig = TalentTechno.create!(talent: dorian, techno: digital)
# dorian_technos_sql = TalentTechno.create!(talent: dorian, techno: sql)

# p "Creating Startup part"

# backmarket = Startup.create!(name: "backmarket", year_of_cration: 2015, collaborators: 57, parity: 65, average_age: 27, turnover: 1_000_000, link: "https://www.backmarket.fr/", address: "152 bd Macdonald", zip_code: "75019", city:"paris" ,overview: "Et velariis minutias ortu aut vel turpi vinariis certant fatiscunt tabernis sua pugnaciter reducto sole umbraculorum velariis aedilitate tabernis turba vinariis imitatus certant studiorum pernoctant omnium turpi imitatus concrepantes turpi.")
# manomano = Startup.create!(name: "manomano", year_of_cration: 2015, collaborators: 9, parity: 69, average_age: 27, turnover: 9_000, link: "https://www.manomano.fr/", address: "152 bd Macdonald", zip_code: "75019", city:"paris" ,overview: "Et velariis minutias ortu aut vel turpi vinariis certant fatiscunt tabernis sua pugnaciter reducto sole umbraculorum velariis aedilitate tabernis turba vinariis imitatus certant studiorum pernoctant omnium turpi imitatus concrepantes turpi.")
# doctolib = Startup.create!(name: "doctolib", year_of_cration: 2010, collaborators: 157, parity: 52, average_age: 31, turnover: 200_000, link: "https://www.doctolib.fr/", address: "32 Rue de Monceau", zip_code: "75008", city:"paris" ,overview: "Et velariis minutias ortu aut vel turpi vinariis certant fatiscunt tabernis sua pugnaciter reducto sole umbraculorum velariis aedilitate tabernis turba vinariis imitatus certant studiorum pernoctant omnium turpi imitatus concrepantes turpi.")

# p "Creating Headhunter part"

# lucas = Headhunter.create(email: "lucas@hotmail.fr", password:"password", firstname: "lucas", job:"HR", validated: true, startup: backmarket )
# amelie = Headhunter.create(email: "amelie@hotmail.fr", password:"password", firstname: "amelie", job:"HR data_analyst", validated: false, startup: manomano)
# justine = Headhunter.create(email: "justine@hotmail.fr", password:"password", firstname: "justine", job:"drh", validated: true, startup: doctolib)
# loic = Headhunter.create(email: "loic@hotmail.fr", password:"password", firstname: "loic", job:"rh for sales and product owner", validated: true, startup: doctolib)

# p "Creating The Talenist part"

# dimitri = Talentist.create(email: "dimitri@hotmail.fr", password:"password", firstname: "dimitri", name:"mussat", super_admin: false)
# magdalena = Talentist.create(email: "magdalena@hotmail.fr", password:"password", firstname: "MAGDALENA", name:"mussat", super_admin: true)





