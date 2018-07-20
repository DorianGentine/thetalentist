require 'open-uri'
require 'nokogiri'
require 'linkedin_scraper'
# class Scraping

#   def scraping_linkedin(talent)
    # url = talent.linledin
    url Linkedin::Profile.get_profile("https://www.linkedin.com/in/dorian-gentine-818a0489")
    puts url
    # html_file = open(url).read
    # html_doc = Nokogiri::HTML(html_file)

    # html_doc.search('.pv-top-card-section__name').first(5).each do |element|
    #   # puts element.text.strip
    #   # puts element.attribute('href').value
    # end
#   end
# end


# require 'open-uri'
# require 'nokogiri'

# ingredient = 'chocolate'
# url = "http://www.letscookfrench.com/recipes/find-recipe.aspx?s=#{ingredient}"

# html_file = open(url).read
# html_doc = Nokogiri::HTML(html_file)

# html_doc.search('.m_titre_resultat a').each do |element|
#   puts element.text.strip
#   puts element.attribute('href').value
# end




