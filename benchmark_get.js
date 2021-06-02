const {performance} = require('perf_hooks')
const {connection: db} = require('mongoose')
const {catModel} = require('./utils/mongoClient')

const NO_OF_PARALLEL_GET = 50
let TOTAL_TIME_TAKEN_IN_MS = 0
const showGetResults = Boolean(0)

const getPromise = async (id) => {
	const documentFilter = {
		name: `${id}_Zildjian`,
	}

	const t0 = performance.now()

	console.log(`🚀︎ Document ${id} get request SENT`)
	let reply = await catModel.findOne(documentFilter)
	showGetResults && console.log('FETCHED', id, JSON.stringify(reply))
	const t1 = performance.now()
	const timeTook = t1 - t0
	console.log(`🙂︎ Document ${id} fetching took ${timeTook} milliseconds.`)
	TOTAL_TIME_TAKEN_IN_MS = TOTAL_TIME_TAKEN_IN_MS + timeTook
}

setTimeout(async () => {
	// Dropping existing collection.
	// NOTE: PLEASE RUN BENCHMARK_SAVE TO SAVE ALL DOCUMENTS FOR ONCE.
	console.log(
		`Saving ${NO_OF_PARALLEL_GET} documents to a collection parallely...`
	)

	try {
		// SAVING PARALLELY ...
		for (let index = 0; index < NO_OF_PARALLEL_GET; index++) {
			getPromise(index + 1)
		}
	} catch (error) {
		console.log('🛑︎ Error happened...', error)
	} finally {
		setTimeout(() => {
			console.log('🔨︎ Closing the connection now...')
			console.log(
				'🧐︎🧐︎🧐︎ Average time taken in seconds:',
				TOTAL_TIME_TAKEN_IN_MS / NO_OF_PARALLEL_GET / 1_000
			)
			db.close()
		}, 10_000) // closing after desired seconds.
	}
})
