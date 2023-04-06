import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ChannelCard from './ChannelCard';
import { Videos } from '.';


const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);

  const { id } = useParams(); 

    useEffect(() => {
      const fetchResults = async() => {
        const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
          
        setChannelDetail(data?.items[0]);

        const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`);

        setVideos(videosData?.items);

      };

      fetchResults();
    }, [id]);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          height: '300px',
          backgroundColor: '#FAD961',
          backgroundImage: 'linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop='-93px' />
      </Box>
      <Box p={2} display='flex'>
        <Box sx={{ mr:{ sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
    
  )
}

export default ChannelDetail