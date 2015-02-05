class Comment < ActiveRecord::Base
  belongs_to :photo
  validates :photo_id, :presence => true
  # If you want to be sure that an association is present, you’ll need to test whether the foreign key used to map the association is present, and not the associated object itself.

end
