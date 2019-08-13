const fetch = require('isomorphic-fetch');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const getScore = () => (Math.floor(Math.random() * (850 - 620)) + 620);
const capitalize = str => (str.charAt(0).toUpperCase() + str.slice(1));

fetch('https://randomuser.me/api/?results=200&nat=us')
.then(res => res.json())
.then((data) => {
	return data.results.map((result) => {
		return {
			id: uuid.v1(),
			score: getScore(),
			firstName: capitalize(result.name.first),
			lastName: capitalize(result.name.last),
			dob: result.dob.date.match(/\d{4}-\d{2}-\d{2}/)[0],
			ssn: result.id.value,
			createdAt: new Date(result.registered.date).toISOString(),
			archived: false,
			img: {
				picture: result.picture.medium,
				thumb: result.picture.thumbnail,
			},
		};
	});
})
.then(reports => fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify({ reports })))
.then(() => console.log('Done!'));
