import Mock from 'mockjs';

Mock.mock('http://localhost:8081/login',{
	data:{
		'token':'432424359480'
	}
})

Mock.mock('http://localhost:8081/user',{
	'name':'@name',
	'email':'@email',
	'age|1-10':5
});

Mock.mock('http://localhost:8081/menu',{
	'id':'@increment',
	'name':'menu',
	'order|10-20':12
})