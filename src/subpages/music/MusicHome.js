import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Divider, Spin, Button, Layout, Menu, Modal, Result, List, Avatar } from 'antd';
import { HomeOutlined, CameraOutlined, CustomerServiceOutlined, LoadingOutlined, InfoCircleOutlined, PlayCircleOutlined, WarningOutlined, AppleFilled, SpotifyFilled, RightOutlined } from '@ant-design/icons';
import MusicBanner from './MusicBanner';
import FooterComponent from '../../other/Footer';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const MusicHome = () => {
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  
  // Album Modal State
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [tracklist, setTracklist] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(false);

  const artistId = '111349822'; 
  const corsProxy = 'https://api.cors.lol/?url=';

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  const fetchMusicData = async (retries = 3) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      let attempt = 0;
      let success = false;

      while (attempt < retries && !success) {
        try {
            // Added limit=500 to fetch entire discography
            response = await fetch(`${corsProxy}https://api.deezer.com/artist/${artistId}/albums?limit=500`);
            if (response.ok) {
                success = true;
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } catch (err) {
            attempt++;
            console.warn(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt >= retries) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      const data = await response.json();
      const allReleases = data.data || [];

      // Sort by date descending
      allReleases.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      // Separate Albums and Singles
      const albumsList = allReleases.filter(r => r.record_type === 'album');
      const singlesList = allReleases.filter(r => r.record_type === 'single' || r.record_type === 'ep');

      setAlbums(albumsList);
      setSingles(singlesList);

      setDemos([
        { title: 'Demo Track 1', audioUrl: '/public/music/demo1.mp3' },
      ]);
    } catch (error) {
      setError("We couldn't connect to the music service. It might be a temporary glitch.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTracklist = async (url) => {
    if (!url) return;
    setLoadingTracks(true);
    try {
        const response = await fetch(`${corsProxy}${url}`);
        const data = await response.json();
        setTracklist(data.data || []);
    } catch (err) {
        console.error("Failed to fetch tracks", err);
        setTracklist([]);
    } finally {
        setLoadingTracks(false);
    }
  };

  const handleAlbumClick = (album) => {
      setSelectedAlbum(album);
      setAlbumModalOpen(true);
      setTracklist([]); // Reset tracks
      fetchTracklist(album.tracklist);
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  // Use the latest release (album or single) for the banner
  const latestRelease = [...albums, ...singles][0];
  const latestReleaseType = latestRelease?.record_type === 'album' ? 'New Album' : (latestRelease?.record_type === 'ep' ? 'New EP' : 'New Single');

  const renderDiscographyItem = (item) => (
      <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} onClick={() => handleAlbumClick(item)} style={{ cursor: 'pointer' }}>
            {/* Removed glass-panel class, used solid background for visibility */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', background: '#2a1a4a' }}>
                <img src={item.cover_medium} alt={item.title} style={{ width: '100%', display: 'block' }} />
                <div style={{ padding: '10px', background: '#2a1a4a' }}>
                    <Text style={{ color: 'white', display: 'block', fontSize: '13px', fontWeight: 'bold' }} ellipsis>{item.title}</Text>
                    <Text style={{ color: '#aaa', fontSize: '11px' }}>{new Date(item.release_date).getFullYear()}</Text>
                </div>
            </div>
        </motion.div>
      </Col>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#120338' }}>
      <Header style={{ background: 'transparent', padding: 0, position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={['music']}
          style={{
            lineHeight: '64px',
            backgroundColor: 'transparent',
            borderBottom: 'none',
            display: 'flex',
            width: '100%'
          }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <a href="/">Home</a>
          </Menu.Item>
          
          <Menu.Item key="about" icon={<InfoCircleOutlined />} onClick={() => setShowAbout(true)}>
             About Music
          </Menu.Item>

           <Menu.Item key="photography" icon={<CameraOutlined />} style={{ marginLeft: 'auto' }}>
            <a href="/#/photo">Photography</a>
          </Menu.Item>
          <Menu.Item key="music" icon={<CustomerServiceOutlined />}>
            <a href="/#/music">Music</a>
          </Menu.Item>
        </Menu>
      </Header>

      <ModernPurpleBackground />

      <Content style={{ padding: 0, position: 'relative' }}>
        {loading ? (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#A020F0' }} spin />} tip="Loading Beats..." />
            </div>
        ) : error ? (
            <div style={{ 
                height: '80vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '20px' 
            }}>
                <Card 
                    className="glass-panel"
                    style={{ 
                        maxWidth: 500, 
                        width: '100%', 
                        textAlign: 'center',
                        border: 'none'
                    }}
                >
                    <Result
                        icon={<WarningOutlined style={{ color: '#ff4d4f' }} />}
                        title={<span style={{ color: '#333' }}>Connection Failed</span>}
                        subTitle={<span style={{ color: '#666' }}>{error}</span>}
                        extra={
                            <Button type="primary" shape="round" size="large" onClick={() => fetchMusicData()} style={{ background: '#A020F0', borderColor: '#A020F0' }}>
                                Try Again
                            </Button>
                        }
                    />
                </Card>
            </div>
        ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                
                {/* Hero Section */}
                <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
                    <motion.div style={{ 
                        position: 'absolute', inset: 0, 
                        backgroundImage: `url(${latestRelease?.cover_xl || '/images/banner.jpg'})`,
                        backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) brightness(0.4)', 
                        y: y, // Parallax Effect
                        scale: 1.2 // Scale up slightly to avoid white edges during parallax
                    }} />
                    <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 1, padding: '0 20px' }}>
                        <img 
                            src={latestRelease?.cover_xl} 
                            alt="Latest Release" 
                            style={{ width: '250px', height: '250px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginBottom: '20px' }} 
                        />
                        <Title level={1} style={{ color: 'white', margin: 0, textShadow: '0 2px 10px black', textAlign: 'center' }}>{latestRelease?.title || 'Latest Release'}</Title>
                        <Text style={{ color: '#ccc', fontSize: '18px', marginBottom: '20px' }}>{latestReleaseType} Out Now</Text>
                        
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button type="primary" shape="round" icon={<SpotifyFilled />} size="large" style={{ backgroundColor: '#1DB954', color: 'white', borderColor: '#1DB954', fontWeight: 'bold' }} href={`https://open.spotify.com/search/${encodeURIComponent('Chrismslist ' + (latestRelease?.title || ''))}`} target="_blank">
                                Listen on Spotify
                            </Button>
                             <Button type="primary" shape="round" icon={<AppleFilled />} size="large" style={{ backgroundColor: '#FA243C', color: 'white', borderColor: '#FA243C', fontWeight: 'bold' }} href={`https://music.apple.com/us/search?term=${encodeURIComponent('Chrismslist ' + (latestRelease?.title || ''))}`} target="_blank">
                                Listen on Apple Music
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                    
                    {/* Discography - Albums */}
                    {albums.length > 0 && (
                        <>
                            <Title level={2} style={{ color: '#E0AAFF', borderLeft: '4px solid #E0AAFF', paddingLeft: '16px' }}>Albums</Title>
                            <Row gutter={[24, 24]}>
                                {albums.map(renderDiscographyItem)}
                            </Row>
                            <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />
                        </>
                    )}

                    {/* Discography - Singles */}
                    {singles.length > 0 && (
                        <>
                            <Title level={2} style={{ color: '#E0AAFF', borderLeft: '4px solid #E0AAFF', paddingLeft: '16px' }}>Singles & EPs</Title>
                            <Row gutter={[24, 24]}>
                                {singles.map(renderDiscographyItem)}
                            </Row>
                            <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />
                        </>
                    )}

                    {/* Demos Section */}
                    {/*
                    <Title level={2} style={{ color: '#E0AAFF', borderLeft: '4px solid #E0AAFF', paddingLeft: '16px' }}>Unreleased Demos</Title>
                    <Row gutter={[16, 16]}>
                        {demos.map((demo, index) => (
                            <Col span={24} md={12} key={index}>
                                <Card 
                                    className="glass-panel"
                                    style={{ border: 'none' }} 
                                    bodyStyle={{ padding: '20px' }}
                                >
                                    <Row align="middle" gutter={16}>
                                        <Col flex="50px">
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#A020F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <PlayCircleOutlined style={{ fontSize: '24px', color: 'white' }} />
                                            </div>
                                        </Col>
                                        <Col flex="auto">
                                            <Text strong style={{ color: '#333', fontSize: '16px', display: 'block' }}>{demo.title}</Text>
                                            <audio controls style={{ width: '100%', marginTop: '8px', height: '30px' }}>
                                                <source src={demo.audioUrl} type="audio/mp3" />
                                            </audio>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    */}
                </div>
            </motion.div>
        )}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff', padding: '20px 0', borderTop: '1px solid #444', zIndex: 1, position: 'relative' }}>
        <GlowingHeaderAnimation />
        <FooterComponent />
      </Footer>

      {/* About Modal */}
      <Modal
        title="About Chrismslist"
        open={showAbout}
        onCancel={() => setShowAbout(false)}
        footer={[
          <Button key="close" onClick={() => setShowAbout(false)}>
            Close
          </Button>
        ]}
      >
        <Paragraph>
          I've been producing music since I was 14, starting with simple loops and evolving into full compositions. My style blends electronic, ambient, and lo-fi elements to create soundscapes that tell a story.
        </Paragraph>
        <Paragraph>
          My goal is to explore new sounds and push the boundaries of what I can create from my bedroom studio.
        </Paragraph>
        <Title level={5}>Inspirations</Title>
        <Paragraph>
          Porter Robinson, Madeon, and the entire bitbird label.
        </Paragraph>
      </Modal>

      {/* Album Details Modal */}
      <Modal
          title={selectedAlbum?.title}
          open={albumModalOpen}
          onCancel={() => setAlbumModalOpen(false)}
          footer={null}
          centered
          width="90%"
          style={{ maxWidth: '600px' }}
      >
          {selectedAlbum && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <img 
                          src={selectedAlbum.cover_xl} 
                          alt={selectedAlbum.title} 
                          style={{ maxWidth: '200px', width: '100%', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }} 
                      />
                      <Title level={4} style={{ marginTop: '10px', marginBottom: '0' }}>{selectedAlbum.title}</Title>
                      <Text type="secondary">{new Date(selectedAlbum.release_date).getFullYear()} • {selectedAlbum.record_type.toUpperCase()}</Text>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <Button block size="large" icon={<SpotifyFilled />} href={`https://open.spotify.com/search/${encodeURIComponent(selectedAlbum.title + ' Chrismslist')}`} target="_blank" style={{ background: '#1DB954', color: '#fff', borderColor: '#1DB954' }}>
                          Listen on Spotify
                      </Button>
                      <Button block size="large" icon={<AppleFilled />} href={`https://music.apple.com/us/search?term=${encodeURIComponent(selectedAlbum.title + ' Chrismslist')}`} target="_blank" style={{ background: '#FA243C', color: '#fff', borderColor: '#FA243C' }}>
                          Listen on Apple Music
                      </Button>
                  </div>

                  <Divider style={{ margin: '10px 0' }}>Tracklist Preview</Divider>
                  
                  {loadingTracks ? (
                      <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>
                  ) : (
                      <List
                          size="small"
                          dataSource={tracklist}
                          renderItem={(item, index) => (
                              <List.Item
                                actions={[
                                    <a href={`https://open.spotify.com/search/${encodeURIComponent('Chrismslist ' + item.title)}`} target="_blank" rel="noreferrer" style={{ fontSize: '20px', color: '#1DB954', marginLeft: '10px' }} title="Play on Spotify">
                                        <SpotifyFilled />
                                    </a>,
                                    <a href={`https://music.apple.com/us/search?term=${encodeURIComponent('Chrismslist ' + item.title)}`} target="_blank" rel="noreferrer" style={{ fontSize: '20px', color: '#FA243C', marginLeft: '10px' }} title="Play on Apple Music">
                                        <AppleFilled />
                                    </a>
                                ]}
                              >
                                  <List.Item.Meta
                                      avatar={<Avatar size="small" style={{ backgroundColor: '#A020F0' }}>{index + 1}</Avatar>}
                                      title={item.title}
                                      description={`${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, '0')}`}
                                  />
                              </List.Item>
                          )}
                      />
                  )}
              </div>
          )}
      </Modal>

    </Layout>
  );
};

export default MusicHome;
