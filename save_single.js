const {connection: db} = require('mongoose')
const {catModel, COLLECTION_NAME} = require('./utils/mongoClient')
const {dropCollection} = require('./utils/dropCollection')

setTimeout(async () => {
  // Dropping existing collection.
  // dropCollection(COLLECTION_NAME)

  try {
    const kitty = new catModel({
      name: 'Zildjian',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, magni?',
      author: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nisi odio non veniam voluptatem aliquid perferendis iure! Inventore, esse numquam.',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam consequatur explicabo nisi placeat ipsam consequuntur recusandae, sapiente sint sequi facere odio incidunt quisquam, perspiciatis tempore? Ab architecto doloremque facere ad laborum modi error animi fugit et? Facilis laborum dolores nisi.',
      comments:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque consectetur at autem minus, doloribus velit aut culpa similique dolorem sequi! Vel exercitationem obcaecati voluptatem velit fuga beatae numquam! Temporibus nihil earum repudiandae aliquid dolorum expedita porro provident, aliquam fugit quos eius, ipsa sit voluptatibus sapiente officiis rem hic totam ipsam.',
    })

    console.log('🚀︎ Sent a save request...')
    const reply = await kitty.save()
    console.log('🙂︎ Document saved... ')
    // console.log('::save.js', {reply})
  } catch (error) {
    console.log('🛑︎ Error happened...', error)
  } finally {
    console.log('🔨︎ Closing the connection now...')
    db.close()
  }
})
