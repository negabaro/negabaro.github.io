
one way to do that

new_car=Car.new(...)

new_car.save(validate: false)
other way to use that

Model.skip_callback(:create) 
to remove that and apply it back

Model.set_callback(:create)

https://stackoverflow.com/questions/20816227/programmatically-disable-rails-validation
https://teratail.com/questions/97040
