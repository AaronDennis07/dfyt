const getlink = async(url)=>{
    try {
        const response = await fetch('/api/getlink',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(url)
        })
        console.log('************************')
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

export default getlink