import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Row, Col, Typography, Divider, Spin, Button, Layout, Modal, Result, List, Avatar, Tooltip } from 'antd';
import { InfoCircleOutlined, PlayCircleOutlined, PauseCircleOutlined, WarningOutlined, AppleFilled, SpotifyFilled, RightOutlined } from '@ant-design/icons';
import LoadingSpinner from '../../animations/LoadingSpinner';
import Navbar from '../../other/Navbar';
import MusicBanner from './MusicBanner';
import FooterComponent from '../../other/Footer';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { Content, Footer } = Layout;

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

  // Audio preview state
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(new Audio());

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  const stopPlayback = useCallback(() => {
    audioRef.current.pause();
    audioRef.current.src = '';
    setPlayingTrack(null);
    setAudioProgress(0);
  }, []);

  const togglePlay = useCallback((track) => {
    if (playingTrack === track.id) {
      audioRef.current.pause();
      setPlayingTrack(null);
    } else {
      audioRef.current.src = track.preview;
      audioRef.current.play();
      setPlayingTrack(track.id);
      setAudioProgress(0);
    }
  }, [playingTrack]);

  const handleAlbumClick = (album) => {
      stopPlayback();
      setSelectedAlbum(album);
      setAlbumModalOpen(true);
      setTracklist([]); // Reset tracks
      fetchTracklist(album.tracklist);
  };

  useEffect(() => {
    fetchMusicData();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => {
      setPlayingTrack(null);
      setAudioProgress(0);
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Use the latest release (album or single) for the banner
  const latestRelease = [...albums, ...singles][0];
  const latestReleaseType = latestRelease?.record_type === 'album' ? 'New Album' : (latestRelease?.record_type === 'ep' ? 'New EP' : 'New Single');

  const renderDiscographyItem = (item) => (
      <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} onClick={() => handleAlbumClick(item)} style={{ cursor: 'pointer' }}>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', background: '#2a1a4a' }}>
                <img src={item.cover_medium} alt={item.title} style={{ width: '100%', display: 'block' }} />
                <div style={{ padding: '10px', background: '#2a1a4a', overflow: 'hidden' }}>
                    <Text style={{ color: 'white', display: 'block', fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} ellipsis>{item.title}</Text>
                    <Text style={{ color: '#aaa', fontSize: '11px' }}>{new Date(item.release_date).getFullYear()}</Text>
                </div>
            </div>
        </motion.div>
      </Col>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#120338' }}>
      <Navbar
        activeKey="music"
        extraItems={[{ key: 'about', icon: <InfoCircleOutlined />, label: 'About Music', onClick: () => setShowAbout(true) }]}
      />

      <ModernPurpleBackground />

      <Content style={{ padding: 0, position: 'relative' }}>
        {loading ? (
            <LoadingSpinner message="Loading Beats" />
        ) : error ? (
            <div style={{ 
                minHeight: '80vh',
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
                        title={<span className="error-title">Connection Failed</span>}
                        subTitle={<span className="error-subtitle">{error}</span>}
                        extra={
                            <Button type="primary" shape="round" size="large" onClick={() => fetchMusicData()} style={{ background: '#A020F0', borderColor: '#A020F0', minHeight: '44px' }}>
                                Try Again
                            </Button>
                        }
                    />
                </Card>
            </div>
        ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                
                {/* Hero Section */}
                <div className="music-hero">
                    <motion.div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${latestRelease?.cover_xl || '/images/banner.jpg'})`,
                        backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) brightness(0.4)',
                        y: y,
                        scale: 1.2
                    }} />
                    <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 1, padding: '0 20px' }}>
                        <img
                            className="music-hero-album-art"
                            src={latestRelease?.cover_xl}
                            alt="Latest Release"
                        />
                        <Title className="music-hero-title" level={isMobile ? 3 : 1} style={{ color: 'white', margin: 0, textShadow: '0 2px 10px black', textAlign: 'center' }}>{latestRelease?.title || 'Latest Release'}</Title>
                        <Text style={{ color: '#ccc', fontSize: isMobile ? '14px' : '18px', marginBottom: '20px' }}>{latestReleaseType} Out Now</Text>

                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button className="spotify-btn" type="primary" shape="round" icon={<SpotifyFilled />} size={isMobile ? 'middle' : 'large'} style={{ fontWeight: 'bold', minHeight: '44px' }} href={`https://open.spotify.com/search/${encodeURIComponent('Chrismslist ' + (latestRelease?.title || ''))}`} target="_blank">
                                Listen on Spotify
                            </Button>
                             <Button className="apple-btn" type="primary" shape="round" icon={<AppleFilled />} size={isMobile ? 'middle' : 'large'} style={{ fontWeight: 'bold', minHeight: '44px' }} href={`https://music.apple.com/us/search?term=${encodeURIComponent('Chrismslist ' + (latestRelease?.title || ''))}`} target="_blank">
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
                                            <Text strong style={{ fontSize: '16px', display: 'block' }} className="demo-title">{demo.title}</Text>
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
          onCancel={() => { stopPlayback(); setAlbumModalOpen(false); }}
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
                      <Button className="spotify-btn" block size="large" icon={<SpotifyFilled />} href={`https://open.spotify.com/search/${encodeURIComponent(selectedAlbum.title + ' Chrismslist')}`} target="_blank" style={{ fontWeight: 'bold', minHeight: '44px' }}>
                          Listen on Spotify
                      </Button>
                      <Button className="apple-btn" block size="large" icon={<AppleFilled />} href={`https://music.apple.com/us/search?term=${encodeURIComponent(selectedAlbum.title + ' Chrismslist')}`} target="_blank" style={{ fontWeight: 'bold', minHeight: '44px' }}>
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
                              <div key={item.id}>
                                <List.Item
                                  actions={[
                                      <a href={`https://open.spotify.com/search/${encodeURIComponent('Chrismslist ' + item.title)}`} target="_blank" rel="noreferrer" style={{ fontSize: '20px', color: '#1DB954', marginLeft: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px', padding: '8px' }} title="Play on Spotify">
                                          <SpotifyFilled />
                                      </a>,
                                      <a href={`https://music.apple.com/us/search?term=${encodeURIComponent('Chrismslist ' + item.title)}`} target="_blank" rel="noreferrer" style={{ fontSize: '20px', color: '#FA243C', marginLeft: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px', padding: '8px' }} title="Play on Apple Music">
                                          <AppleFilled />
                                      </a>
                                  ]}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                                        {item.preview ? (
                                            <Tooltip title="30s preview">
                                                <span
                                                    className={`track-play-btn${playingTrack === item.id ? ' playing' : ''}`}
                                                    onClick={() => togglePlay(item)}
                                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px', padding: '8px' }}
                                                >
                                                    {playingTrack === item.id ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                                </span>
                                            </Tooltip>
                                        ) : (
                                            <span style={{ width: 24 }} />
                                        )}
                                        <List.Item.Meta
                                            avatar={<Avatar size="small" style={{ backgroundColor: '#A020F0' }}>{index + 1}</Avatar>}
                                            title={item.title}
                                            description={`${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, '0')}`}
                                        />
                                    </div>
                                </List.Item>
                                {playingTrack === item.id && (
                                    <div className="track-progress" style={{ width: `${audioProgress}%` }} />
                                )}
                              </div>
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
