class ContactFormsController < ApplicationController
  def create
    @contact = ContactForm.new(contact_params)
    if @contact.save
      redirect_to request.referrer
    end
    authorize @contact
  end

  private

  def contact_params
    params.require(:contact_form).permit(:email, :name, :phone, :subject, :message)
  end
end
