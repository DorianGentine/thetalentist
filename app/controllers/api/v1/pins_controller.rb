class Api::V1::PinsController < Api::V1::BaseController

  def create
    @pin = Pin.new(pin_params)

    authorize @pin
    if @pin.save
      render :show, status: :created
    else
      render_error
    end
  end

  def destroy
    @pins = Pin.find(params[:id])
    authorize @pins
    @pins.destroy
    head :no_content
  end

  private

  def pin_params
    params.require(:pin).permit(:talent_id, :headhunter_id)
  end

   def render_error
    render json: { errors: @pin.errors.full_messages },
      status: :unprocessable_entity
  end
end
