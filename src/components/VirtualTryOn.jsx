import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaTimes, FaCamera, FaDownload, FaSyncAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './VirtualTryOn.css';
import { productsData } from '../data/products';

const defaultFrames = productsData.filter(p => p.image && typeof p.image === 'string' && p.image.startsWith('data:image/svg'));

const VirtualTryOn = ({ isOpen, onClose, initialProduct }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(initialProduct || defaultFrames[0]);
  const [isMirrored, setIsMirrored] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);
  
  const [verticalOffset, setVerticalOffset] = useState(0.5);
  const [scaleMultiplier, setScaleMultiplier] = useState(2.2);
  
  const verticalOffsetRef = useRef(verticalOffset);
  const scaleMultiplierRef = useRef(scaleMultiplier);
  
  const selectedFrameRef = useRef(selectedFrame);
  const isMirroredRef = useRef(isMirrored);
  const imageCacheRef = useRef({});
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === 'left') {
        current.scrollBy({ left: -200, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    selectedFrameRef.current = selectedFrame;
    if (selectedFrame && !imageCacheRef.current[selectedFrame.id]) {
      const img = new Image();
      img.src = selectedFrame.image;
      imageCacheRef.current[selectedFrame.id] = img;
    }
  }, [selectedFrame]);

  useEffect(() => {
    isMirroredRef.current = isMirrored;
  }, [isMirrored]);
  
  useEffect(() => {
    verticalOffsetRef.current = verticalOffset;
  }, [verticalOffset]);

  useEffect(() => {
    scaleMultiplierRef.current = scaleMultiplier;
  }, [scaleMultiplier]);
  
  // Load MediaPipe scripts dynamically to avoid Vite/Webpack build issues with these specific packages
  useEffect(() => {
    if (!isOpen) return;

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');
        setScriptsLoaded(true);
      } catch (error) {
        console.error("Error loading MediaPipe scripts", error);
      }
    };

    loadScripts();
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      stopCamera();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !scriptsLoaded) return;

    const initializeFaceMesh = async () => {
      if (!window.FaceMesh || !window.Camera) {
          setTimeout(initializeFaceMesh, 100);
          return;
      }

      if (faceMeshRef.current) return; // Already initialized

      const faceMesh = new window.FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      faceMesh.onResults(onResults);
      faceMeshRef.current = faceMesh;

      if (webcamRef.current && webcamRef.current.video) {
        const camera = new window.Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (webcamRef.current && webcamRef.current.video && faceMeshRef.current) {
               await faceMeshRef.current.send({ image: webcamRef.current.video });
            }
          },
          width: 640,
          height: 480
        });
        camera.start();
        cameraRef.current = camera;
      }
    };
    
    // Delay slightly to ensure video element is fully mounted
    setTimeout(initializeFaceMesh, 500);

    return () => {
      stopCamera();
    };
  }, [isOpen, scriptsLoaded]);

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    if (faceMeshRef.current) {
      faceMeshRef.current.close();
      faceMeshRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const onResults = (results) => {
    if (!isModelLoaded) setIsModelLoaded(true);
    
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    
    // Match canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If mirrored, flip the canvas context before drawing anything
    if (isMirroredRef.current) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    // Draw the video frame to the canvas
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      
      // We use the outer and inner corners of the eyes for more stable tracking across all face_mesh versions
      const leftEyeOuter = 33;
      const leftEyeInner = 133;
      const rightEyeOuter = 263;
      const rightEyeInner = 362;
      
      // Convert normalized coordinates to pixel coordinates
      const w = canvas.width;
      const h = canvas.height;
      
      const leftEyeCenter = {
        x: ((landmarks[leftEyeOuter].x + landmarks[leftEyeInner].x) / 2) * w,
        y: ((landmarks[leftEyeOuter].y + landmarks[leftEyeInner].y) / 2) * h
      };
      
      const rightEyeCenter = {
        x: ((landmarks[rightEyeOuter].x + landmarks[rightEyeInner].x) / 2) * w,
        y: ((landmarks[rightEyeOuter].y + landmarks[rightEyeInner].y) / 2) * h
      };
      
      const leftOuterPt = leftEyeCenter;
      const rightOuterPt = rightEyeCenter;
      
      // Determine which eye is on the left side of the image to ensure dx is positive.
      const eye1 = leftOuterPt.x < rightOuterPt.x ? leftOuterPt : rightOuterPt;
      const eye2 = leftOuterPt.x < rightOuterPt.x ? rightOuterPt : leftOuterPt;
      const angle = Math.atan2(eye2.y - eye1.y, eye2.x - eye1.x);
      
      // Calculate distance between eyes for scaling
      const pupilDistance = Math.hypot(rightOuterPt.x - leftOuterPt.x, rightOuterPt.y - leftOuterPt.y);
      
      // Calculate the exact midpoint between the eyes as the center point
      const centerPt = { 
        x: (leftOuterPt.x + rightOuterPt.x) / 2, 
        y: (leftOuterPt.y + rightOuterPt.y) / 2 
      };
      
      // Draw Glasses
      drawGlasses(ctx, centerPt, pupilDistance, angle);
    }
    ctx.restore();
  };

  const drawGlasses = (ctx, centerPt, pupilDistance, angle) => {
    const currentFrame = selectedFrameRef.current;
    if (!currentFrame) return;
    
    const img = imageCacheRef.current[currentFrame.id];
    
    // Wait for image to load if not already
    if (!img || !img.complete) return;

    ctx.save();
    

    // Magic blend mode to remove the white background from product images!
    ctx.globalCompositeOperation = 'multiply';
    
    // The Lenskart product images have a LOT of white padding around the glasses.
    // To make the actual glasses fit the face, the total image width needs to be much larger than the pupil distance.
    // Pupil distance is roughly 63mm, glasses width is 135mm. The image itself has padding.
    // A multiplier of 3.2 ensures the frames span correctly across the face without being oversized.
    const glassesWidth = pupilDistance * scaleMultiplierRef.current; 
    const scale = glassesWidth / img.width;
    const glassesHeight = img.height * scale;
    
    // Move to the exact midpoint between the eyes
    ctx.translate(centerPt.x, centerPt.y);
    
    // Rotate to match eye angle
    ctx.rotate(angle);
    
    // Draw image centered at the translated origin
    // Adjust yOffset to correctly position the glasses over the eyes.
    const yOffset = -glassesHeight * verticalOffsetRef.current;
    ctx.drawImage(img, -glassesWidth / 2, yOffset, glassesWidth, glassesHeight);
    
    ctx.restore();
  };

  const handleCapture = () => {
    if (canvasRef.current) {
      const imageSrc = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(imageSrc);
    }
  };

  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'lenskart-tryon.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="tryon-overlay">
      <div className="tryon-container">
        {/* Header */}
        <div className="tryon-header">
          <h2>Virtual Try-On</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        {/* Main View Area */}
        <div className="tryon-view-area">
          {/* Controls */}
          <div className="tryon-controls" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 40, background: 'rgba(15, 15, 15, 0.4)', backdropFilter: 'blur(12px)', padding: '12px 16px', borderRadius: '12px', color: 'white', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', width: '140px' }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#ccc' }}>Size</label>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>{scaleMultiplier.toFixed(1)}</span>
              </div>
              <input type="range" min="1.0" max="8.0" step="0.1" value={scaleMultiplier} onChange={(e) => setScaleMultiplier(parseFloat(e.target.value))} style={{ width: '100%', height: '4px', accentColor: '#fff', cursor: 'pointer' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#ccc' }}>Height</label>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>{verticalOffset.toFixed(2)}</span>
              </div>
              <input type="range" min="-0.5" max="1.5" step="0.05" value={verticalOffset} onChange={(e) => setVerticalOffset(parseFloat(e.target.value))} style={{ width: '100%', height: '4px', accentColor: '#fff', cursor: 'pointer' }} />
            </div>
          </div>

          {!isModelLoaded && (
            <div className="tryon-loading">
              <div className="spinner"></div>
              <p>Initializing AI Face Detection...</p>
            </div>
          )}
          
          {capturedImage && (
            <div className="captured-image-container" style={{ position: 'absolute', zIndex: 30, width: '100%', height: '100%', background: '#000' }}>
              <img src={capturedImage} alt="Captured" className="captured-image" />
            </div>
          )}
          
          <div className="video-container" style={{ visibility: capturedImage ? 'hidden' : 'visible' }}>
            {/* Hidden webcam, we draw everything to the canvas */}
              <Webcam
                ref={webcamRef}
                className="hidden-webcam"
                videoConstraints={{
                  facingMode: "user",
                  width: 640,
                  height: 480,
                }}
                mirrored={isMirrored}
              />
              <canvas ref={canvasRef} className="output-canvas"></canvas>
          </div>

          {/* Side Toolbar */}
          <div className="tryon-toolbar">
            {!capturedImage ? (
              <>
                <button className="tool-btn" onClick={() => setIsMirrored(!isMirrored)} title="Mirror Camera">
                  <FaSyncAlt />
                </button>
              </>
            ) : (
              <>
                <button className="tool-btn" onClick={() => setCapturedImage(null)} title="Retake">
                  <FaSyncAlt />
                </button>
                <button className="tool-btn download-btn" onClick={handleDownload} title="Download Photo">
                  <FaDownload />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Frame Selection Carousel */}
        {!capturedImage && (
          <div className="tryon-footer">
            <h3>Try Other Frames</h3>
            <div className="carousel-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
              <button className="carousel-nav-btn" onClick={() => scroll('left')} style={{ position: 'absolute', left: 0, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <FaChevronLeft />
              </button>
              <div className="frames-carousel" ref={scrollRef} style={{ scrollBehavior: 'smooth' }}>
                {defaultFrames.map((frame) => (
                  <div 
                    key={frame.id} 
                    className={`frame-option ${selectedFrame?.id === frame.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFrame(frame)}
                  >
                    <img src={frame.image} alt={frame.name} />
                    <span className="frame-name">{frame.name}</span>
                  </div>
                ))}
              </div>
              <button className="carousel-nav-btn" onClick={() => scroll('right')} style={{ position: 'absolute', right: 0, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTryOn;
