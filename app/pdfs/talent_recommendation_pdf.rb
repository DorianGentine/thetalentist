class TalentRecommendationPdf
  NAME = 'recommandation_de_talents.pdf'

  def initialize(talent)
    @talent = talent
  end

  def generate
    pdf_html = renderer.render(
      template: 'talents/pdf_recommendation.html.erb',
      layout: 'pdf.html.erb',
      assigns: { talent: @talent }
    )

    pdf_options = { pdf: NAME, page_width: 210, page_height: 210 }
    WickedPdf.new.pdf_from_string(pdf_html, pdf_options)
  end

  private

  def renderer
    ApplicationController.renderer
  end
end
