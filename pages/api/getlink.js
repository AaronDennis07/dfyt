import youtubedl from '@distube/youtube-dl'



export default async function handler(req, res) {

    try {

        const url = req.body
      
        const data = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: url,
            f:'best[ext=mp4]'
           
        })
        const data1 = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: url,
            f:'worstvideo[ext=mp4]'
           
        })
        const data2 = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: url,
            f:'bestaudio[ext=m4a]'
           
        })
       
        res.status(200).json({
            best: {
                file_name: data.requested_downloads[0]._filename,
                format: data.requested_downloads[0].format_note,
                url:  data.requested_downloads[0].url
            },
            worst: {
                file_name: data1.requested_downloads[0]._filename,
                format: data1.requested_downloads[0].format_note,
                url:  data1.requested_downloads[0].url
            },
            audio: {
                file_name: data2.requested_downloads[0]._filename,
                format: 'Audio',
                url:  data2.requested_downloads[0].url
            },

        })
    }catch(err){
        res.status(400).json({
            error: 'Invalid link'
        })
    }
    
    

}
