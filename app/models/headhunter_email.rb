class HeadhunterEmail < ApplicationRecord
  belongs_to :headhunter

  before_save :check_if_changed

  private

  def check_if_changed
    if self.newletter_changed?
      link_to_subscribe
    end
  end

  def link_to_subscribe
    if self.newletter
      subscribe_to_newsletter
    end
  end

  def subscribe_to_newsletter
    SubscribeToNewsletterService.new(self.headhunter).call
  end
end
