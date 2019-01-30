class StatisticJob < ApplicationJob
  queue_as :default

  def perform(talent_id)
    p "starting loading in background"
    talent = Talent.find(talent_id)
    test_st = talent.save_completed_profil
    talent.save
    p "RESULTAT DE TEST: #{test_st}"

    p "#{talent.cv}"
    puts "OK I'm done now"
    # Do something later
  end
end
