class HeadhunterAutomation
  def initialize(user)
    @user = user
    @gibbon = Gibbon::Request.new(api_key: ENV['MAILCHIMP_API_KEY'])
    @audience_id = ENV['MAILCHIMP_AUDIENCE_STARTUP_ID']
  end

  def welcome
    @gibbon.lists(@audience_id).members.create(
      body: {
        email_address: @user.email,
        status: "Bienvenue #{@user.firstname} sur The Talentist!",
        merge_fields: {
          FNAME: @user.firstname,
        #   LNAME: @user.last_name
        }
      }
    )
  end
end
