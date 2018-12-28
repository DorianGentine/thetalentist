class ContactForm < ApplicationRecord
  validates :name, :email, presence: true
  acts_as_messageable


  after_create :send_contact_form

  private

  def send_contact_form
    ContactFormMailer.contact_form(self).deliver_later
  end
end
