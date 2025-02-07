import React, { useState, useEffect } from 'react';
import { Card, Row, Col, List, Typography, Divider, Spin, Button } from 'antd';
import MusicBanner from './MusicBanner'; // Import the MusicBanner
import FooterComponent from '../../other/Footer';

const { Title, Text } = Typography;

const MusicHome = () => {
  // State values
  const [releaseHistory, setReleaseHistory] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Deezer API artist ID 
  const artistId = '111349822'; 

  // CORS proxy URL
  const corsProxy = 'https://api.cors.lol/?url=';

  // Fetching data from Deezer API
  const fetchMusicData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state on new fetch attempt

      // Fetch artist's albums (release history)
      const releaseHistoryResponse = await fetch(`${corsProxy}https://api.deezer.com/artist/${artistId}/albums`);
      if (!releaseHistoryResponse.ok) {
        throw new Error('Failed to fetch release history');
      }
      const releaseHistoryData = await releaseHistoryResponse.json();
      setReleaseHistory(releaseHistoryData.data);

      // Fetch latest news (mock data for now)
      setLatestNews([
        { title: 'Upcoming Album Teased', date: '2025-02-02', description: 'The artist has teased an upcoming album, coming soon in 2025!' },
      ]);

      // Demos - Manually add audio tracks
      setDemos([
        { title: 'Demo Track 1', audioUrl: '/public/music/demo1.mp3' },
      ]);
    } catch (error) {
      setError(error.message); // Set error if any API call fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  // Retry fetching data on button click
  const handleRetry = () => {
    fetchMusicData();
  };

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
        <br />
        <Button type="primary" onClick={handleRetry} style={{ marginTop: '10px' }}>
          Retry
        </Button>
        <br />
        <Text type="secondary" style={{ marginTop: '10px' }}>
          Try again later
        </Text>
      </div>
    );
  }

  // Get latest release cover for the banner (first album in release history)
  const latestReleaseCover = releaseHistory.length > 0 ? releaseHistory[0].cover_xl : '/images/default-cover.jpg';

  return (
    <div>
      {/* Music Banner at the top with the latest release cover */}
      <MusicBanner
        photoPath={latestReleaseCover}  // Full resolution cover of the latest release
        artistName="Chrismslist"         // Specify the artist name
        albumName={releaseHistory.length > 0 ? releaseHistory[0].title : 'Current Album'} // Album name of the latest release
      />

      <Title level={2}>Music Home</Title>

      {/* Latest News */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Latest News" bordered>
            <List
              itemLayout="vertical"
              dataSource={latestNews}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={`${item.date} - ${item.description}`}
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

      {/* Demos */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Demos" bordered>
            <List
              itemLayout="horizontal"
              dataSource={demos}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <audio controls>
                        <source src={item.audioUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <br />

      <div style={{
        textAlign: 'center', 
        background: '#001529', 
        color: '#fff', 
        padding: '20px 0', 
        fontSize: '14px', 
        borderTop: '1px solid #444',
        zIndex: 1,
      }}>
        <FooterComponent />
      </div>
    </div>
  );
};

export default MusicHome;
