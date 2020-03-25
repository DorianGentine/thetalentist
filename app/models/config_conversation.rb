class ConfigConversation < ApplicationRecord
  # mount_uploaders :files, PdfUploader
  has_many_attached :files
  validates :user_email, uniqueness: { scope: [:user_id, :conversation_id]}
  before_create :set_archived_pin

  private

  def set_archived_pin
    self.archived = false
    self.pin = false
  end
end
