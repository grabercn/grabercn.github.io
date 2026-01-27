import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Divider, Spin, Button, Layout, Menu, Modal, Result } from 'antd';
import { HomeOutlined, CameraOutlined, CustomerServiceOutlined, LoadingOutlined, InfoCircleOutlined, PlayCircleOutlined, WarningOutlined } from '@ant-design/icons';
import MusicBanner from './MusicBanner';
import FooterComponent from '../../other/Footer';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const MusicHome = () => {
  const [releaseHistory, setReleaseHistory] = useState([]);
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

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
            response = await fetch(`${corsProxy}https://api.deezer.com/artist/${artistId}/albums`);
            if (response.ok) {
                success = true;
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } catch (err) {
            attempt++;
            console.warn(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt >= retries) throw err;
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      const releaseHistoryData = await response.json();
      setReleaseHistory(releaseHistoryData.data);

      setDemos([
        { title: 'Demo Track 1', audioUrl: '/public/music/demo1.mp3' },
      ]);
    } catch (error) {
      setError("We couldn't connect to the music service. It might be a temporary glitch.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  const latestRelease = releaseHistory.length > 0 ? releaseHistory[0] : null;

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
                    <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 1 }}>
                        <img 
                            src={latestRelease?.cover_xl} 
                            alt="Latest Release" 
                            style={{ width: '250px', height: '250px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginBottom: '20px' }} 
                        />
                        <Title level={1} style={{ color: 'white', margin: 0, textShadow: '0 2px 10px black' }}>{latestRelease?.title || 'Latest Release'}</Title>
                        <Text style={{ color: '#ccc', fontSize: '18px' }}>New Single Out Now</Text>
                        <Button type="primary" shape="round" icon={<PlayCircleOutlined />} size="large" style={{ marginTop: '20px', backgroundColor: '#A020F0', borderColor: '#A020F0' }} href={latestRelease?.link} target="_blank">
                            Listen on Deezer
                        </Button>
                    </div>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                    
                    {/* Discography Grid */}
                    <Title level={2} style={{ color: 'white', borderLeft: '4px solid #A020F0', paddingLeft: '16px' }}>Discography</Title>
                    <Row gutter={[24, 24]}>
                        {releaseHistory.map((album) => (
                            <Col xs={12} sm={8} md={6} lg={4} key={album.id}>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <a href={album.link} target="_blank" rel="noopener noreferrer">
                                        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
                                            <img src={album.cover_medium} alt={album.title} style={{ width: '100%', display: 'block' }} />
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '8px', backdropFilter: 'blur(4px)' }}>
                                                <Text style={{ color: 'white', display: 'block', fontSize: '12px', fontWeight: 'bold' }} ellipsis>{album.title}</Text>
                                                <Text style={{ color: '#aaa', fontSize: '10px' }}>{new Date(album.release_date).getFullYear()}</Text>
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>

                    <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

                    {/* Demos Section */}
                    <Title level={2} style={{ color: 'white', borderLeft: '4px solid #A020F0', paddingLeft: '16px' }}>Unreleased Demos</Title>
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
        title={<span style={{ color: '#A020F0' }}>About Chrismslist</span>}
        open={showAbout}
        onCancel={() => setShowAbout(false)}
        footer={null}
        bodyStyle={{ background: '#1a1a1a', color: '#ddd' }}
        style={{ top: 50 }}
      >
        <Paragraph style={{ color: '#ccc' }}>
          I've been producing music since I was 14, starting with simple loops and evolving into full compositions. My style blends electronic, ambient, and lo-fi elements to create soundscapes that tell a story.
        </Paragraph>
        <Paragraph style={{ color: '#ccc' }}>
          My goal is to explore new sounds and push the boundaries of what I can create from my bedroom studio.
        </Paragraph>
        <Title level={5} style={{ color: 'white' }}>Inspirations</Title>
        <Paragraph style={{ color: '#ccc' }}>
          Porter Robinson, Madeon, and the entire bitbird label.
        </Paragraph>
      </Modal>
    </Layout>
  );
};

export default MusicHome;
