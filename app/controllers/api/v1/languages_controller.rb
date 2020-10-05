class Api::V1::LanguagesController < Api::V1::BaseController


  def index
    @languages = Language.all
    skip_policy_scope
  end


end
