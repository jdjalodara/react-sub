
import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../firebaseConfig'; // Adjust path as needed
import { collection, getDocs, query, limit } from 'firebase/firestore';
import cat_hand from '../assets/images/cat-hand.png';
import cat from '../assets/images/cat.png';
import Home_black from '../assets/images/Home-black.svg';
import Mail from '../assets/images/Mail.svg';
import save_black from '../assets/images/save-black.svg';
import akCalendar from '../assets/images/akCalendar.png';
import akPrice from '../assets/images/akPrice.png';
import akBed from '../assets/images/akBed.png';
import akLocation from '../assets/images/akLocation.png';
import akPets from '../assets/images/akPets.png';
import akX from '../assets/images/akX.png';
import akSaveVector from '../assets/images/akSaveUnfilledVector@3x (1).png';
import akFloor from '../assets/images/akFloorVector@3x (2).png';
import akLocationUnFilledVector from '../assets/images/akLocationUnfilledVector@3x (1).png';
import akShareVector from '../assets/images/share.png';
import akCommentVector from '../assets/images/comment.png';
import akFilterVector from '../assets/images/akFilterVector@3x (1).png';
import akHome from '../assets/images/akHome.png';
import akGender from '../assets/images/akGender.png';
import user from '../assets/images/user.svg';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { videoURL } = useParams();

  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]); // Create a ref to store video elements

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoID = new URLSearchParams(window.location.search).get('videoURL');
        const q = query(collection(firestore, 'listings'));
        const querySnapshot = await getDocs(q);

        let matchedVideo = null;
        const videoList = [];

        querySnapshot.forEach(doc => {
          const data = doc.data();

          if (data.id === videoID) {
            matchedVideo = {
              videoURL: data.videoURL,
              startsAtUnix: data.startsAtUnix,
              roomTypes: data.roomTypes,
              petInfo: data.petInfo,
              thumbURL: data.thumbURL, // Assuming you have this field
              price: data.price,
              neighbourhoodName: data.neighbourhoodName,
              gender: data.gender,
              layout: data.layout,
              endsAtUnix: data.endsAtUnix,
              noFlexing: data.noFlexing,
              amenities: data.amenities
            };
          } else {

            videoList.push({
              videoURL: data.videoURL,
              startsAtUnix: data.startsAtUnix,
              roomTypes: data.roomTypes,
              petInfo: data.petInfo,
              thumbURL: data.thumbURL, // Assuming you have this field
              price: data.price,
              neighbourhoodName: data.neighbourhoodName,
              gender: data.gender,
              layout: data.layout,
              endsAtUnix: data.endsAtUnix,
              noFlexing: data.noFlexing,
              amenities: data.amenities
            });
          }

        });


        // Shuffle the videoList
        for (let i = videoList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [videoList[i], videoList[j]] = [videoList[j], videoList[i]];
        }

        let finalVideos = videoList;

        if (matchedVideo) {
          // Keep the first video as matchedVideo and add two random videos from the shuffled list
          finalVideos = [matchedVideo, ...videoList.slice(0, 2)];
        } else {
          // Otherwise, just pick three random videos
          finalVideos = videoList.slice(0, 3);
        }

        setVideos(finalVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    // Ensure that the first video auto-plays after videos are set
    if (videos.length > 0 && videoRefs.current[0]) {
      videoRefs.current[0].play();
    }
  }, [videos]);


  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
    const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and add leading zero (0-indexed)
    const year = date.getFullYear(); // Get full year
    return `${day}.${month}.${year}`;
  };

  // Restart video when it ends
  const handleVideoEnd = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].currentTime = 0;
      videoRefs.current[index].play();
    }
  };
  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const videoHeight = e.currentTarget.clientHeight;

    const currentIndex = Math.round(scrollTop / videoHeight);

    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleSharing = async () => {
    if (navigator.share) {
      try {

        const shareData = {
          title: "Sublynyc",
          text: "Hey Check out this sublet on Subly!",
          url: "http://sublynyc.com",
        };

        await navigator
          .share(shareData)
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log("Web share is currently not supported on this browser. Please provide a callback");
    }
  };


  console.log('this is video list', videos);

  return (
    <>
      <header className="header">
        <div className="left"><img src={akFilterVector} alt="Fillers" /></div>
        <div className="right" ></div>
      </header>

      {videos.map((video, index) => (
        <div className='scroll-main'>
          <div className="scroll-container" style={{ overflowY: 'scroll', height: '100vh', }}>

            <div key={index} className="video-section" style={{ height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <ul className="right-section">
                <li onClick={handleSharing} style={{ cursor: 'pointer' }}>
                  <img src={akShareVector} alt="Untitled" />
                  <span>Share</span>
                </li>
                <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'} style={{ cursor: 'pointer' }}>
                  <img src={akCommentVector} alt="Save" />
                  <span>Chat</span>
                </li>
                <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'} style={{ cursor: 'pointer' }}>
                  <img src={akSaveVector} alt="Map" />
                  <span>Save</span>
                </li>
                <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'} style={{ cursor: 'pointer' }} >
                  <img src={akLocationUnFilledVector} alt="Untitled 2" />
                  <span>Location</span>
                </li>
                <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'} style={{ cursor: 'pointer' }} >
                  <img src={akFloor} alt="Untitled 2" />
                  <span>Floor plan</span>
                </li>
              </ul>
              <div class="main-content">
                <ul>
                  <li><img src={akLocation} alt="Location" /> <h6 style={{ fontWeight: 'bold' }}>{video.neighbourhoodName}</h6></li>
                  <li><img src={akPrice} alt="Price" /> <h6 style={{ fontWeight: 'bold' }}>${video.price}</h6></li>
                  <li><img src={akCalendar} alt="Date" /> <h6 style={{ fontWeight: 'bold' }}>{formatDate(video.startsAtUnix)} - {formatDate(video.endsAtUnix)}</h6></li>
                  <li><img src={akHome} alt="Layout" /> <h6 style={{ fontWeight: 'bold' }}>{video.layout}</h6></li>
                  {video.roomTypes && video.roomTypes.map((roomType, idx) => (
                    <li key={idx}><img src={akBed} alt="Room Type" /> <h6 style={{ fontWeight: 'bold' }}>{roomType}</h6></li>
                  ))}
                  <li><img src={akX} alt="Pet Info" /> <h6 style={{ fontWeight: 'bold' }}>{video.noFlexing}</h6></li>
                  <li><img src={akPets} alt="Pet Info" /> <h6 style={{ fontWeight: 'bold' }}>{video.petInfo}</h6></li>
                  <li><img src={akGender} alt="Pet Info" /> <h6 style={{ fontWeight: 'bold' }}>{video.gender}</h6></li>
                  {video.amenities && video.amenities.map((roomType, idx) => (
                    <li key={idx}><img src={akBed} alt="Room Type" /> <h6 style={{ fontWeight: 'bold' }}>{roomType}</h6></li>
                  ))}
                </ul>
              </div>
              {/* Video element */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                controls
                autoPlay
                muted
                playsInline // Add this attribute
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onEnded={() => handleVideoEnd(index)}
              >
                <source src={video.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </div>
      ))}



      <footer className="footer">
        <ul>
          <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'} style={{ backgroundImage: `url(${cat_hand})`, cursor: 'pointer', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <img src={Home_black} alt="Home Icon" />
          </li>
          <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'}
            style={{ cursor: 'pointer' }} ><img src={Mail} alt="Mail Icon" />

          </li>
          <li className="cat-icon" onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'}
            style={{ cursor: 'pointer' }}>
            <img src={cat} alt="Cat Icon" />
          </li>
          <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'}
            style={{ cursor: 'pointer' }}><img src={save_black} alt="Save Icon" />
          </li>
          <li onClick={() => window.location.href = 'https://www.apple.com/in/app-store/'}
            style={{ cursor: 'pointer' }}><img src={user} alt="User Icon" />
          </li>
        </ul>
      </footer>

    </>
  );
};

export default Home;

