require 'test_helper'

class TalentPresenterTest < ActiveSupport::TestCase
  def setup
    @talent_presenter = TalentPresenter.new(talents(:talent))
    @valid_talent_presenter = TalentPresenter.new(talents(:talent_with_dependencies))
  end

  test 'first job title exists' do
    assert_equal(@valid_talent_presenter.first_job_title, 'Market')
  end

  test 'empty first job title when talent has not job' do
    assert_empty(@talent_presenter.first_job_title)
  end

  test 'name of position when talent has experience' do
    assert_equal(@valid_talent_presenter.position, 'Project manager')
  end

  test 'empty position when talent has not experience' do
    assert_empty(@talent_presenter.position)
  end

  test 'years of talent\'s experience' do
    assert_equal(@valid_talent_presenter.years_of_experience, 3)
  end

  test 'zero value of years when talent has not job' do
    assert_equal(@talent_presenter.years_of_experience, 0)
  end

  test 'talent can work remotely' do
    assert_equal(@valid_talent_presenter.can_work_remotely?, true)
  end

  test 'talent can not work remotely' do
    assert_equal(@talent_presenter.can_work_remotely?, false)
  end

  test 'remuneration of the talent' do
    assert_equal(@valid_talent_presenter.remuneration, '40k€ à 50k€')
  end

  test 'nil remuneration when next aventure does not exist' do
    assert_nil(@talent_presenter.remuneration)
  end

  test 'looking_for value of the talent' do
    assert_equal(@valid_talent_presenter.looking_for, 'looking for something')
  end

  test 'nil looking_for value when next aventure does not exist' do
    assert_nil(@talent_presenter.looking_for)
  end

  test 'talent\'s mobilities list' do
    assert_equal(@valid_talent_presenter.mobilities_list, 'Télétravail, Paris, Bordeaux')
  end

  test 'empty mobilities list when next aventure does not exist' do
    assert_empty(@talent_presenter.mobilities_list)
  end

  test 'sectors list of the talent' do
    assert_equal(@valid_talent_presenter.sectors_list, 'Saas Marketplace Finance')
  end

  test 'empty sectors list when next aventure does not exist' do
    assert_empty(@talent_presenter.sectors_list)
  end
end
