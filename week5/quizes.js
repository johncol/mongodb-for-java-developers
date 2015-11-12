
db.products.aggregate([{
	$group: {
		_id: $manufactor,
		products_num: {
			$sum: 1
		}
	}
}]);

db.products.aggregate([{
	$group: {
		_id: {
			manufactor: '$manufactor'
		},
		products_num: {
			$sum: 1
		}
	}
}]);

db.products.aggregate([{
	$group: {
		_id: {
			manufactor: '$manufactor',
			category: '$category'
		},
		products_num: {
			$sum: 1
		}
	}
}]);

db.zips.aggregate([{
	$group: {
		_id: '$state',
		population: {
			$sum: '$pop'
		}
	}
}]);

db.products.aggregate([{
	$group: {
		_id: '$category',
		averagePrice: {
			$avg: '$price'
		}
	}
}]);

db.zips.aggregate([{
	$group: {
		_id: '$state',
		avg_pop: {
			$avg: '$pop'
		}
	}
}]);

db.zips.aggregate([{
	$group: {
		_id: '$city',
		postal_codes: {
			$addToSet: '$_id'
		}
	}
}]);

db.zips.aggregate([{
	$group: {
		_id: '$state',
		pop: {
			$max: '$pop'
		}
	}
}]);




{ "_id" : 2, "a" : 0, "b" : 1, "c" : 52 }
{ "_id" : 4, "a" : 1, "b" : 0, "c" : 22 }


db.fun.aggregate([{
	$group: {
		_id: {
			a:"$a", 
			b:"$b"
		}, 
		c: {
			$max: "$c"
		}
	}
}, {
	$group: {
		_id: "$_id.a", 
		c: {
			$min: "$c"
		}
	}
}]);

db.zips.aggregate([{
	$project: {
		_id: 0,
		city: {
			$toLower: '$city'
		},
		pop: 1,
		state: 1,
		zip: '$_id'
	}
}]);

db.zips.aggregate([{
	$match: {
		pop: {
			$gt: 100000
		}
	}
}]);

db.zips.aggregate([{
	$sort: {
		state: 1,
		city: 1
	}
}]);


dd.zips.aggregate([{
	$match: {
		state: 'NY'
	}
}, {
	$group: {
		_id: '$city',
		pop: {
			$sum: '$pop'
		},
		zip_codes: {
			$addToSet: '$_id'
		}
	}
}, {
	$project: {
		_id: 0,
		city: '$city',
		pop: 1,
		zip_codes: 1
	}
}, {
	$sort: {
		pop: -1
	}
}, {
	$skip: 10
}, {
	$limit: 5
}])

