class Api::V1::PagesController < Api::V1::BaseController


  def navbar
    @user = current_user
    @photo = @user.photo.small_bright_face.url
    @urls =  {
      conv: @user.mailbox.conversations.count > 0 ? conversation_path(@user.mailbox.conversations.first) : "/conv",
      # conv: conversation_path(@user.mailbox.conversations.last),
      profil: @user.profil_url,
      admin: admin_root_path,
      talents: talents_path,
      startup: headhunters_path,
      repertoire: repertoire_path,
    }
    authorize @user
  end


end
