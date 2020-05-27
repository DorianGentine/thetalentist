class Api::V1::SkillsController < Api::V1::BaseController

  def index
    @skills = Skill.all
    skip_policy_scope
  end

  
end
