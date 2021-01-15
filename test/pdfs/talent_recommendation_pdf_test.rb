require 'test_helper'

class TalentRecommendationPdfTest < ActiveSupport::TestCase
  test 'pdf generation' do
    talent = TalentPresenter.new(talents(:talent))

    renderer = ApplicationController.renderer
    render_mock = Minitest::Mock.new
    render_mock.expect(:render, 'pdf_template', [Hash])

    options = {
      pdf: TalentRecommendationPdf::NAME,
      page_width: 210,
      page_height: 210
    }
    wicked_pdf_mock = Minitest::Mock.new
    wicked_pdf_mock.expect(:pdf_from_string, 'pdf_content', [String, options])

    renderer.stub(:new, render_mock) do
      WickedPdf.stub(:new, wicked_pdf_mock) do
        result = TalentRecommendationPdf.new(
          renderer: renderer.new,
          talent: talent
        ).generate

        assert_equal(result, 'pdf_content')
      end
    end

    wicked_pdf_mock.verify
    render_mock.verify
  end
end
