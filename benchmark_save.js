const {performance} = require('perf_hooks')
const {connection: db} = require('mongoose')
const {catModel, COLLECTION_NAME} = require('./utils/mongoClient')
const {dropCollection} = require('./utils/dropCollection')

const NO_OF_PARALLEL_SAVE = 100
let TOTAL_TIME_TAKEN_IN_MS = 0

const savePromise = async (id) => {
	const kitty = new catModel({
		name: `${id}_Zildjian`,
		title: `${id}_Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, magni?`,
		author: `${id}_Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nisi odio non veniam voluptatem aliquid perferendis iure! Inventore, esse numquam.`,
		body: `${id}_Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam consequatur explicabo nisi placeat ipsam consequuntur recusandae, sapiente sint sequi facere odio incidunt quisquam, perspiciatis tempore? Ab architecto doloremque facere ad laborum modi error animi fugit et? Facilis laborum dolores nisi.`,
		comments: `${id}_Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque consectetur at autem minus, doloribus velit aut culpa similique dolorem sequi! Vel exercitationem obcaecati voluptatem velit fuga beatae numquam! Temporibus nihil earum repudiandae aliquid dolorum expedita porro provident, aliquam fugit quos eius, ipsa sit voluptatibus sapiente officiis rem hic totam ipsam.`,
	})

	// let timerLabel = `Document ${id} save time`
	// console.time(timerLabel)

	const t0 = performance.now()

	console.log(`🚀︎ Document ${id} save request SENT`)
	const reply = await kitty.save()
	// console.log('::save.js', {reply})
	const t1 = performance.now()
	const timeTook = t1 - t0
	console.log(`🙂︎ Document ${id} SAVED in ${timeTook} milliseconds.`)
	TOTAL_TIME_TAKEN_IN_MS = TOTAL_TIME_TAKEN_IN_MS + timeTook
}

setTimeout(async () => {
	// Dropping existing collection.
	console.log(await dropCollection(COLLECTION_NAME))
	console.log(
		`Saving ${NO_OF_PARALLEL_SAVE} documents to a collection parallely...`
	)

	try {
		// SAVING PARALLELY ...
		for (let index = 0; index < NO_OF_PARALLEL_SAVE; index++) {
			savePromise(index + 1)
		}
	} catch (error) {
		console.log('🛑︎ Error happened...', error)
	} finally {
		setTimeout(() => {
			console.log('🔨︎ Closing the connection now...')
			console.log(
				'🧐︎🧐︎🧐︎ Average time taken in seconds:',
				TOTAL_TIME_TAKEN_IN_MS / NO_OF_PARALLEL_SAVE / 1_000
			)
			db.close()
		}, 5_000) // closing after desired seconds.
	}
})
