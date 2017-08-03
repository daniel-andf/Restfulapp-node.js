const Joi = require('joi')
const tools = require('./functions')


module.exports =[
	{
		path:'/{param*}',
		method: 'GET',
		handler:{  
			directory: {
	        path: 'public',
	        listing: true,
	        index: true
	      }
	    }
	},

	{
		path:'/books',
		method: 'GET',
		handler: tools.listBooks
	},

	{
		path:'/books',
		method: 'POST',
		config: {
			validate: {
				payload: {
					title: Joi.string().min(5).max(100).required(),
					author: Joi.string().min(5).max(100).required(),
					genre: Joi.string().min(5).max(15).required(),
					year:Joi.number().integer().min(1900).max(2013).required(),
					publisher:Joi.string().min(5).max(100).required(),
					country:Joi.string().min(5).max(30).required(),
					copies: Joi.number().required()
				}
			}
		},
		handler: tools.addBooks
	},

	{
		path:'/books/',
		method: 'GET',
		config: {
			validate: {
				query: {
					id: Joi.number().required()
				}
			}
		},			
		handler: tools.findBookById
	},

	{
		path:'/books/genre/',
		method: 'GET',
		config: {
			validate: {
				query: {
					genre: Joi.string().max(15),
				}
			}
		},			
		handler: tools.searchBookGenre
	},

	{
		path:'/books/title/',
		method: 'GET',
		config: {
			validate: {
				query: {
					title: Joi.string().max(100),
				}
			}
		},			
		handler: tools.searchBookTitle
	},

	{
		path:'/books/author/',
		method: 'GET',
		config: {
			validate: {
				query: {
					author: Joi.string().max(100)
				}
			}
		},			
		handler: tools.searchBookAuthor
	},

	{
		path:'/books/delete',
		method: 'GET',
		config: {
			validate: {
				query: {
					id: Joi.number().required()
				}
			}
		},			
		handler: tools.deleteBooksGet
	},

	{
		path:'/books/delete/{id}',
		method: 'DELETE',
		handler: tools.deleteBooksDelete
	},

	{
		path:'/books/update',
		method: ['PUT','POST'],
		config: {
			validate: {
				payload: {
					id: Joi.number().required(),
					title: Joi.string().max(100).allow(''),
					author: Joi.string().max(100).allow(''),
					genre: Joi.string().max(15).allow(''),
					year:Joi.number().integer().allow(''),
					publisher:Joi.string().max(100).allow(''),
					country:Joi.string().max(30).allow(''),
					copies: Joi.number().allow('')

				}
			}
		},			
		handler: tools.updateBooks
	},

	{
		path:'/books/getbook',
		method: 'POST',
		config: {
			validate: {
				payload: {
					id: Joi.number().required(),
					//user: Joi.number().required()
				}
			}
		},			
		handler: tools.getBook
	},	

]



