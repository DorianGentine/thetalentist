class TalentRecommendationPdf
  def generate(pdf_html)
    WickedPdf.new.pdf_from_string(
      pdf_html,
      pdf: 'Recommandation de talents',
      page_width: 210,
      page_height: 210
    )
  end
end