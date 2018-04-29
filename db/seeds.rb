p "Destroy Talent"

Talent.destroy_all
Formation.destroy_all
Known.destroy_all
Skill.destroy_all
Keyword.destroy_all

p "Creating talents"

  luc = Talent.create(email: "luc@hotmail.fr", password: "password", firstname: "luc", name: "buisson", city: "strabourg", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: false, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")
  donatien = Talent.create(email: "donatien@hotmail.fr", password: "password", firstname: "donatien", name: "rolland", city: "nantes", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:true, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")
  dorian = Talent.create(email: "dorian@hotmail.fr", password: "password", firstname: "dorian", name: "gentine", city: "lille", phone:"0786019941", linkedin:"https://www.linkedin.com/feed/?trk=hb_signin", cv:"", btoc: true, btob:false, validated: false, visible:false ,overview:"Ausus negotiis defensantem iam eos praeerat eos adoritur in praeerat iustissimus rector rector et abrupto Paulum minui rector exitio adhuc instabat defensantem potuit sortem mucronem inpegit ut imperatoris casus levare cognomentum sortem ille vicarium Paulus iam conplicandis dextera praeerat eos eundem ausus conplicandis negotiis abrupto mucronem dextera miserabiles cum minui.")

p "Created #{Talent.count} talents"

p "Creating credentials for Henri"

marc_from_backmarket = Credential.create(firstname: "marc", company_name: "backmarket", name: "gesneau", email: "marc@hotmail.fr", phone: "0786019941")
louise_from_backmarket = Credential.create(firstname: "louise", company_name: "blablacar", name: "martin", email: "louise@hotmail.fr", phone: "0786019941")
adrien_from_backmarket = Credential.create(firstname: "adrien", company_name: "desbrasenplus", name: "moison", email: "adrien@hotmail.fr", phone: "0786019941")

p "Creating experiences for Henri"

data_analyst = Experience.create( position: "Data analyste", company_name: "valeo", link:"https://www.valeo.com/fr/", years:"2015 - 2017", currently: false, overview: "Valeo est un équipementier automobile, partenaire de tous les constructeurs dans le monde. Entreprise technologique, Valeo propose des systèmes et équipements innovants permettant la réduction des émissions de CO2 et le développement de la conduite intuitive.")
data_scientist = Experience.create( position: "data scientist", company_name: "uber", link:"https://www.uber.com/", years:"2017", currently: true, overview: "Uber, anciennement UberCab, est une entreprise technologique américaine qui développe et exploite des applications mobiles de mise en contact d'utilisateurs avec des conducteurs réalisant des services de transport.")
data_owner = Experience.create( position: "data owner", company_name: "blablacar", link:"https://www.backmarket.com/", years:"2012 2015", currently: false, overview: "Smartphone reconditionné à neuf et garanti. Et des centaines d'ordinateurs, PS4, tablettes, télévisions, etc. Livraison 48h. iPhone 6 reconditionné")

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

# hec.talent = luc

p "Creating keywords"

motiver = Keyword.create(title: "motiver")
aimable = Keyword.create(title: "aimable")
actif = Keyword.create(title: "actif")
communicatif = Keyword.create(title: "communicatif")
intuitif = Keyword.create(title: "intuitif")

p "Creating talent_keywords"


p "Creating knowns"

bouche_a_oreille = Known.create(title: "Bouche à oreille")
facebook = Known.create(title: "facebook")
twitter = Known.create(title: "Twitter")
linkedin = Known.create(title: "Linkedin")
evenement = Known.create(title: "Evénement")

p "Creating talent_knowns"


p "Creating languages"

english = Language.create(title: "english")
francais = Language.create(title: "Francais")
spanish = Language.create(title: "spanish")
german = Language.create(title: "german")


p "Creating talent_languages"


p "Creating next_aventures"

manger = NextAventure.create(city: "paris", contrat:"cdi", remuneration: "2000 - 3000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
data = NextAventure.create(city: "bordeux", contrat:"cdd", remuneration: "10000 - 15000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis. Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.", available: false)
sales = NextAventure.create(city: "normandie", contrat:"cdi", remuneration: "4000", no_more: "Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", overview:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", why_leaving:"Iuris Iudaeis aptae et domitis Iudaeis calentes in navigerum speciem navigerum dictione in sorte locis locis dictione aquae ad delata in emergunt domitis his regiones multiplicium provinciae domitis dictione Iudaeis.", last_words:"Et sis et eadem in ambigente venias in adsiduitati ad te cum tandem quo numerando.", available: true)
p "Creating sectors"

data = Sector.create(title: "Data", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
sales = Sector.create(title: "Sales", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
product = Sector.create(title: "Product", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")
market = Sector.create(title: "Market", description: "Suis deflecti sub nec rebus fatorum apparuit praemiis ulla quos rebus posse beneficiis repente ubi.")

p "Creating talent_sectors"

p "Creating skills"

statistiques = Skill.create(title: "statistiques")
outils_analytiques = Skill.create(title: "outils analytiques")
programmation = Skill.create(title: " langages de programmation")
hadoop = Skill.create(title: "Hadoop")
logiciel = Skill.create(title: "ingénierie logicielle")

p "Creating talent_skills"


p "Creating technos"

digital = Techno.create(title: "Digital")
php = Techno.create(title: "php")
ruby = Techno.create(title: "ruby")
sql = Techno.create(title: "sql")

p "Creating talent_technos"


