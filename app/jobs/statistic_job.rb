class StatisticJob < ApplicationJob
  queue_as :default

  def perform(talent_id)
    Talent.find(talent_id).save_completed_profil
    # Do something later
  end
end
