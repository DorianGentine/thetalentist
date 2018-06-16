class JobAlerte < ApplicationRecord
  belongs_to :headhunter
  belongs_to :job
end
