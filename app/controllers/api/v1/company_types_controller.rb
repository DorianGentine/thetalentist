class Api::V1::CompanyTypesController < Api::V1::BaseController


  def index
    @companyTypes = CompanyType.all
    skip_policy_scope
  end


end
