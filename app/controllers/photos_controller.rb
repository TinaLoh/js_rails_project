class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def create
    @photo = Photo.new(photos_params)
    if @photo.save
      render json: @photo
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    if @photo.destroy
      render json: @photo
    end
  end

  private

  def photos_params
    params.require(:photo).permit(:url, :caption, :location)
  end
end
