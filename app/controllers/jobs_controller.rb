class JobsController < ApplicationController


  def update
    p 'update Job Controller'
    @job = Job.find(params[:id])
    if @job.update_attributes(post_params)
    redirect_to post_path, :notice => 'Your post has been updated.'
    else
    render 'new'
    end
  end

  def post_params
    params.require(:job).permit(:title)
  end
end

