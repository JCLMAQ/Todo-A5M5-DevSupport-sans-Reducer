let unew= new ds.User({
	fullName: 'JCM',
	email: 'jcm',
	password: 'jcm',
	group: 'users'
});

try {
      unew.save();
    } catch (e) { }
    
const u = ds.User.find('email == :1', 'jcm');