const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/library'

module.exports = {

	listBooks: function (request,response){
	
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')

			collection.find().toArray((err, data) => {
	        if (err) throw err
	        
	        response(data)
	    	db.close()
	  	    
	  	    })

		 })

	},

	addBooks: function (request,response){

		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
		

			collection.find({}, {limit: 1, sort: {'_id': -1}}).toArray((err, data) => {
		        if (err) throw err
		        
		       	if(data[0] == null)
		       		var id = 1
		       	else		
		        	var id = data[0]['_id'] + 1

		    	var insertData = {
					_id: id,
					title: request.payload.title.toUpperCase(),
					author: request.payload.author.toUpperCase(),
					genre: request.payload.genre.toUpperCase(),
					publication_information: [{year: request.payload.year, publisher: request.payload.publisher.toUpperCase(), 
						country: request.payload.country.toUpperCase()}],
					availability: [{copies: request.payload.copies, available:'Y', users:[{0:{}}]}]
					 
				}


			 	collection.insert(insertData,(err, data) => {
			   	 	if (err) throw err
			        
			        

			        db.close()

			        return response("Book added to our library!!!")
			    	})


	    	  	    
	  	    })

			


		 })

	},


	findBookById : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')

			collection.find({_id: request.query.id}).toArray((err, data) => {
	        if (err) throw err
	        
	        response(data)
	    	db.close()
	  	    
	  	    })

		 })

	},


	searchBookGenre : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var findGenre = request.query.genre

			collection.find({genre: { $regex: findGenre, $options: 'i' }})
			.toArray((err, data) => {
	        if (err) throw err
	        
	        response(data)
	    	db.close()
	  	    
	  	    })

		 })

	},

	searchBookAuthor : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var findAuthor = request.query.author


			collection.find({author: { $regex: findAuthor, $options: 'i' }})
			.toArray((err, data) => {
	        if (err) throw err
	        
	        response(data)
	    	db.close()
	  	    
	  	    })

		 })

	},

	searchBookTitle : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var findTitle = request.query.title



			collection.find({title: { $regex: findTitle, $options: 'i' }})
			.toArray((err, data) => {
	        if (err) throw err
	        
	        response(data)
	    	db.close()
	  	    
	  	    })

		 })

	},

	deleteBooksGet : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var id = request.query.id

			collection.remove({_id: id},(err) => {
	        if (err) throw err
	        
	        response("Book Deleted")
	    	db.close()
	  	    
	  	    })

		 })

	},

	deleteBooksDelete : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var idInput = request.params.id

			console.log(idInput)
			collection.remove({_id: idInput},(err) => {
	        if (err) throw err
	        
	        response("Book Deleted")
	    	db.close()
	  	    
	  	    })

		 })

	},

	updateBooks : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var id = request.payload.id

			var titleInput = request.payload.title
			var authorInput = request.payload.author
			var genreInput = request.payload.genre
			var yearInput = request.payload.year
			var publisherInput = request.payload.publisher
			var countryInput = request.payload.country
			var copiesInput = request.payload.copies

			if(titleInput == null){
				titleInput = ''
			}	

			if(authorInput == null){
				authorInput = ''
			}	

			if(genreInput == null){
				genreInput = ''
			}	

			if(yearInput == null){
				yearInput = ''
			}	

			if(publisherInput == null){
				publisherInput = ''
			}	

			if(countryInput == null){
				countryInput = ''
			}	

			if(copiesInput == null){
				copiesInput = ''
			}	


			if(titleInput != ''){
				collection.update({_id: id}, {$set: {title: titleInput.toUpperCase()}})
		  	}

			if(authorInput != ''){
				collection.update({_id: id}, {$set: {author: authorInput.toUpperCase()}})
		  	}

			if(genreInput != ''){
				collection.update({_id: id}, {$set: {genre: genreInput.toUpperCase()}})
		  	}

			if(yearInput != ''){
				collection.update({_id: id}, {$set: {'publication_information.0.year': yearInput}})
		  	}

			if(publisherInput != ''){
				collection.update({_id: id}, {$set: {'publication_information.1.publisher': publisherInput.toUpperCase()}})
		  	}

			if(countryInput != ''){
				collection.update({_id: id}, {$set: {'publication_information.2.country': countryInput.toUpperCase()}})
		  	}

			if(copiesInput != ''){
				collection.update({_id: id}, {$set: {'availability.0.copies': copiesInput}})
		  	}	  	

			db.close()
			response("Book Updated!!!")
		 })

	},

	getBook : function (request,response){
		
		mongo.connect(url, (err, db) =>{
			var collection = db.collection('library')
			var id = request.payload.id
			//var userId = request.query.user

			collection.find({_id: id}).toArray((err, data) => {
				if (err) throw err


				var copies = data[0]['availability'][0]['copies']
				//var users = data[0]['availability'][0]['users']
				//var index = Object.keys(users).length - 1

				//var exp= "availability.0.users."+ index


				if(copies == 0)
					response("There is no copy available of this book")
				else{

					copies=copies - 1
					

					if(copies == 0){

						/*collection.update({_id: id},{$set:{'availability.0.copies': 0, 'availability.1.available': 'N', 
							$exp: userId}})*/
						collection.update({_id: id},{$set:{'availability.0.copies': 0, 'availability.0.available': 'N'}})	
						response("Book Rented")    
						
				    }

				    else{
				    	/*collection.update({_id: id},{$set:{'availability.0.copies': copies, $exp :userId}})*/
						collection.update({_id: id},{$set:{'availability.0.copies': copies}})
						response("Book Rented")
				    }

				}
				

			
			
		
			})

		})
	}
}
