

sequelize.transaction(function(t) {
		Recorder.create({ recorder_firstname : firstR}, {recorder_lastname: lastR}, {recorder_email : emailR}, {recorder_password: pwdR}, {admin_code: value}).success(function() {
			// what do we want the function to do upon successful receipt?
		})
}