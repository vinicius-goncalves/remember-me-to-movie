;(async () => {

    try {

        (await import('dotenv')).config()
        await import('./src/server/app.js')
        console.log('All required modules were loaded.')

    } catch(err) {
        console.log(err)
    }

})()