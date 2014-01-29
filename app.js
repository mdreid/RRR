/* Makes the database tables using sequelize for node.js */

var Sequelize = require('sequelize') , 
	sequelize = new Sequelize('rrrdb', 'rrr', 'techteam', {
		dialect: 	"mysql",
		port: 		3306
	})

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

// Now for the actual schema

var Recorder = sequelize.define('Recorder', {
	recorder_code: 		{ type: Sequelize.INTEGER, 
						  notNull: true },

	recorder_lastname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	recorder_firstname: { type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	recorder_email: 	{ type: Sequelize.STRING,
						  isEmail: true }	
})

var Admin = sequelize.define('Admin', {
	admin_code: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	admin_lastname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	admin_firstname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	admin_schoolcode: 	{ type: Sequelize.INTEGER,
						  notNull: true }
})

var Student = sequelize.define('Student', {
	student_code: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	student_lastname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	student_firstname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	student_age: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	student_grade: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	student_booksread: 	{ type: Sequelize.INTEGER,
						  notNull: true }
})

var State = sequelize.define('State', {
	state_name: 		{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	state_abbr: 		{ type: Sequelize.STRING(2), 
						  notNull: true }
})

var Teacher = sequelize.define('Teacher', {
	teacher_code: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	teacher_firstname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	teacher_lastname: 	{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	teacher_datejoined: Sequelize.DATE
})

var School = sequelize.define('School', {
	school_code: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	school_name: 		{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	school_town: 		{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true },

	school_booksread: 	{ type: Sequelize.INTEGER,
		  				  notNull: true }
})

var Book = sequelize.define('Book', {
	book_isbn: 				{ type: Sequelize.STRING,
						  	  notNull: true,
						  	  notEmpty: true },

	book_code: 				{ type: Sequelize.INTEGER,
							  notNull: true },

	book_numpages: 			{ type: Sequelize.INTEGER,
							  notNull: true },

	book_authorlastname: 	{ type: Sequelize.STRING,
						  		notNull: true,
						  		notEmpty: true },

	book_authorfirstname: 	{ type: Sequelize.STRING,
						  		notNull: true,
						  		notEmpty: true },

	book_title: 			{ type: Sequelize.STRING,
						  		notNull: true,
						  		notEmpty: true },

	book_approval: 			{ type: Sequelize.STRING,
						  		notNull: true,
						  		notEmpty: true },
						  		 // what is this?
	book_audiopath: 		Sequelize.STRING(1000)
})

var Event = sequelize.define('Event', {
	event_code: 			{ type: Sequelize.INTEGER,
							  notNull: true },

	event_name: 			{ type: Sequelize.STRING,
						  		notNull: true,
						  		notEmpty: true },

	event_date: 			Sequelize.DATE,
})

var Footnote = sequelize.define('Footnote', {
	footnote_code: 		{ type: Sequelize.INTEGER,
						  notNull: true },

	footnote_body: 		{ type: Sequelize.STRING,
						  notNull: true,
						  notEmpty: true }
})

Admin.hasMany(Recorder, { foreignKey: 'recorder_code' })
Recorder.belongsTo(Admin)
Recorder.hasMany(Book, { foreignKey: 'book_code' })
Book.belongsTo(Recorder)
Teacher.hasMany(Student, { foreignKey: 'student_code' })
Student.belongsTo(Teacher)
School.hasMany(Teacher, { foreignKey: 'teacher_code' })
Teacher.belongsTo(School)
State.hasMany(School, { foreignKey: 'school_code' })
School.belongsTo(State)
Book.hasOne(Event, { foreignKey: 'event_code' })
Event.belongsTo(Book)
Book.hasOne(Footnote, { foreignKey: 'footnote_code' })
Footnote.belongsTo(Book)
School.hasMany(Event, { foreignKey: 'event_code' })
Event.belongsTo(School)

sequelize.sync({force: true})
/*
Recorder-->book: one-->many
Admin-->recorder: one-->many
Teacher-->student: one-->many
School-->teacher: one-->many
State-->school: one-->many

Book/audiofiles

Book-->event: one-->one
Book-->footnote: one-->one
School-->event: one-->many
*/

