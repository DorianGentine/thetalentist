class SubscribeToNewsletterService
  def initialize(user)
    @user = user
    @gibbon = Gibbon::Request.new(api_key: ENV['MAILCHIMP_API_KEY'])
    @audience_id = ENV['MAILCHIMP_AUDIENCE_ID']
  end

  def newletter
    @gibbon.lists(@audience_id).members.create(
      body: {
        email_address: @user.email,
        status: "subscribed",
        merge_fields: {
          FNAME: @user.firstname,
        #   LNAME: @user.last_name
        }
      }
    )
  end


end
