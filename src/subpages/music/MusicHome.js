import React, { useState, useEffect } from 'react';
import { Card, Row, Col, List, Typography, Divider, Spin } from 'antd';
import MusicBanner from './MusicBanner'; // Import the MusicBanner

const { Title, Text } = Typography;

const MusicHome = () => {
  // State values
  const [currentMusic, setCurrentMusic] = useState([]);
  const [releaseHistory, setReleaseHistory] = useState([]);
  const [upcomingMusic, setUpcomingMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Deezer API artist ID 
  const artistId = '111349822'; 

  // CORS proxy URL
  const corsProxy = 'https://api.cors.lol/?url=';

  // Fetching data from Deezer API
  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state on new fetch attempt

        // Fetch top tracks (current music)
        const currentMusicResponse = await fetch(`${corsProxy}https://api.deezer.com/artist/${artistId}/top?limit=5`);
        if (!currentMusicResponse.ok) {
          throw new Error('Failed to fetch current music');
        }
        const currentMusicData = await currentMusicResponse.json();
        setCurrentMusic(currentMusicData.data);

        // Fetch artist's albums (release history)
        const releaseHistoryResponse = await fetch(`${corsProxy}https://api.deezer.com/artist/${artistId}/albums`);
        if (!releaseHistoryResponse.ok) {
          throw new Error('Failed to fetch release history');
        }
        const releaseHistoryData = await releaseHistoryResponse.json();
        setReleaseHistory(releaseHistoryData.data);

        // Fetch upcoming music (mock data)
        setUpcomingMusic([
          { title: 'Upcoming Album', releaseDate: 'Unknown' },
        ]);
      } catch (error) {
        setError(error.message); // Set error if any API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  // Render loading spinner if data is being fetched
  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  // Render error message if something goes wrong
  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Title level={3}>Something went wrong...</Title>
        <Text type="danger">{error}</Text>
      </div>
    );
  }

  // Get latest release cover for the banner (first album in release history)
  const latestReleaseCover = releaseHistory.length > 0 ? releaseHistory[0].cover_xl : '/images/default-cover.jpg';

  return (
    <div style={{ }}>
      {/* Music Banner at the top with the latest release cover */}
      <MusicBanner
        photoPath={latestReleaseCover}  // Full resolution cover of the latest release
        artistName="Chrismslist"         // Specify the artist name
        albumName={releaseHistory.length > 0 ? releaseHistory[0].title : 'Current Album'} // Album name of the latest release
      />

      <Title level={2}>Music Home</Title>

      {/* Current Music */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Current Music" bordered>
            <List
              itemLayout="horizontal"
              dataSource={currentMusic.length > 0 ? currentMusic : [{ title: 'No data available' }]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={`Release Date: ${item.release_date}`}
                    avatar={<img src={item.cover_medium} alt={item.title} style={{ width: 50, height: 50 }} />}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Release History */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Release History" bordered>
            <List
              itemLayout="horizontal"
              dataSource={releaseHistory.length > 0 ? releaseHistory : [{ title: 'No releases available' }]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={`Release Date: ${item.release_date}`}
                    avatar={<img src={item.cover_medium} alt={item.title} style={{ width: 50, height: 50 }} />}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Upcoming Music */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Upcoming Music" bordered>
            <List
              itemLayout="horizontal"
              dataSource={upcomingMusic.length > 0 ? upcomingMusic : [{ title: 'No upcoming music available', releaseDate: 'TBD' }]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={`Release Date: ${item.releaseDate}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MusicHome;
