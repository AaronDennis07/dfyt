import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react'
import { Modal,Link, Box, ButtonGroup, AppBar, Card, CardContent, CardActions, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import getlink from '../apiHandlers/main'

export default function Home() {
  const [info, setInfo] = useState({
    urls: [],
    title: '',
    formats: [],

  })

  const [formControl, setFormControl] = useState({
    isLoading: false,
    format: '',
    url: '',
    banner: true,
    optionSelcted: 0,
    isModalOpen: false,
    error: false,
    text: ''
  })

  const handleChange = (evt) => {
    setFormControl({
      ...formControl,
      text: evt.target.value
    })
  }
  const handleClick = (evt) => {
    const trimmedUrl = formControl.text.trim()
   
    setFormControl({
      ...formControl,
      isLoading: true,
      isModalOpen: true
    })
    getlink(trimmedUrl).then((data) => {
      if (data && data.error) {
        setFormControl({
          ...formControl,
          error: data.error
        })
      }
        else{
        setInfo({
          ...info,
          title: data.best.file_name,
          urls: [data.best.url, data.worst.url, data.audio.url],
          formats: [data.best.format, data.worst.format, data.audio.format]
        })

        setFormControl({
          ...formControl,
          url:info.urls[0],
          isLoading: false,
          banner: false,
          

        })
        
      }

    })
  
  }


  const handleSelectChange = (evt) => {
    const value = evt.target.value

    const url = info.urls[value]
    setFormControl({
      ...formControl,
      optionSelcted: value,
      url
    })
  }

  return (
    <div >
      <Head>
        <title>dfyt</title>
      </Head>
      <AppBar position="static">
        <Typography variant="h4" sx={{ mx: 'auto' }}>DFYT</Typography>
      </AppBar>
      <Typography variant="h5" component='p' sx={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10%', textAlign: "center" }}>Youtube Video And Audio Downloader</Typography>


      <div style={{ paddingTop: '5%', textAlign: 'center', justifyContent: 'center' }}>
        <TextField value={formControl.text} onChange={handleChange} size='small' id="outlined-basic" placeholder='Enter the URL' variant="outlined" />
        <Button onClick={handleClick} sx={{ mt: '0.08rem', mx: '0.2rem' }} variant="contained">Go</Button>




        <Paper hidden={formControl.banner} sx={{ wordBreak: '10', textAlign: 'center', mt: '5%' }} elevation={5}>
          <Typography>Title:</Typography>
          <Typography>{info.title.slice(0, 60)}.....</Typography>


          <ButtonGroup sx={{ mt: '2%', mb: '2%' }} variant="contained" aria-label="outlined primary button group">
  
            <Button  href={formControl.url ? formControl.url : info.urls[0]}  >
              Download
              </Button>
             
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="format"
              value={formControl.optionSelcted}
              onChange={handleSelectChange}
            >
              {info.formats.map((format, i) => (
                i === 2 ? (<MenuItem key={i} value={i}>{format}</MenuItem>) : <MenuItem key={i} value={i}>MP4 {format}</MenuItem>
              ))}
            </Select>
          </ButtonGroup>

        </Paper>
      </div>
      {formControl.error ? ( 
      <div style={{ paddingTop: '5%', textAlign: 'center', justifyContent: 'center' }}>
        <Typography color='red' component='h5' variant='h5'>Invalid URL</Typography>
      </div>
        ):(
      <Modal
        open={formControl.isModalOpen}
        maxwidth='100%'

      >
        <div style={{ textAlign: 'center' }}>
          <Paper maxwidth={300} >
            <Image width='600px' style={{ marginTop: '20%' }} height='150px' src='/loading.gif' />
            <Typography>Processing the link to download. Stay on this page</Typography>
          </Paper>

        </div>
      </Modal>)}
    </div>

  )
}
