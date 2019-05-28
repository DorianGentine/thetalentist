class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true


  def mailboxer_email(object)
   #return the model's email here
  end
end
