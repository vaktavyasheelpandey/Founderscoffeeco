document.addEventListener('DOMContentLoaded', function () {

  const coverVideo = document.getElementById('coverVideo');
  const existingControlsBtn = document.getElementById('cover_video_controls_btn');
  
  if (coverVideo && !coverVideo.hasAttribute('controls') && !existingControlsBtn) {
  
    // Creating cover video controls play/stop button
    function createVideoControlsBtn() {
      const playPauseButton = document.createElement('button');
      playPauseButton.type = 'button';
      playPauseButton.id = 'cover_video_controls_btn_mt';
      playPauseButton.className = 'video-controls-btn mt-btn';
      playPauseButton.setAttribute('role', 'button');
      playPauseButton.setAttribute('aria-label', 'The decorative video is currently playing, pause the video');
      playPauseButton.innerHTML = `
        <span class='off-screen'>The decorative video is currently playing</span>
        <i class='fa fa-pause' aria-hidden='true'></i>
        <i class='fa fa-play' aria-hidden='true'></i>
      `;
  
      // Set initial display state of play/pause icons
      const playIcon = playPauseButton.querySelector('.fa-play');
      const pauseIcon = playPauseButton.querySelector('.fa-pause');
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      
      playPauseButton.addEventListener('click', function () {
        if (coverVideo.paused) {
          coverVideo.play();
        } else {
          coverVideo.pause();
        }
        updatePlayPauseButtonState();
      });
  
      // Insert button immediately after cover video in DOM
      coverVideo.insertAdjacentElement('afterend', playPauseButton);
  
      // Call the styling function immediately after creating the button
      styleVideoControlsBtn();
  
      // Attach resize event listener for responsive styles
      window.addEventListener("resize", debounce(() => {
        styleVideoControlsBtn();
      }, 200));
    }
  
    // Styling cover video controls play/stop button
    function styleVideoControlsBtn() {
      const coverVideoControlsBtn = document.getElementById('cover_video_controls_btn_mt');
      const faIcons = coverVideoControlsBtn.querySelectorAll('.fa');
  
      if (coverVideoControlsBtn) {

        // Apply styles to video play/stop controls button
        const buttonStyles = {
          position: 'absolute',
          bottom: '20px',
          left: '25px',
          width: '45px',
          height: '45px',
          padding: '1px 6px',
          fontSize: '3.5em',
          zIndex: '100',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          color: '#fff',
        };
  
        Object.assign(coverVideoControlsBtn.style, buttonStyles);
  
        // Apply styles to all icon elements in the video play/stop controls button
        faIcons.forEach((faIcon) => {
          const faIconStyles = {
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '45px',
            height: '40px',
            fontSize: '0.75em',
            cursor: 'pointer',
          };
  
          Object.assign(faIcon.style, faIconStyles);
        });
  
        // Media queries for responsive styles
        if (window.innerWidth <= 1024) {
          coverVideoControlsBtn.style.fontSize = '3em';
        }
        if (window.innerWidth <= 767) {
          Object.assign(coverVideoControlsBtn.style, {
            bottom: '10px',
            left: '15px',
            width: '30px',
            height: '30px',
            fontSize: '2.3em',
          });
  
          faIcons.forEach((faIcon) => {
            Object.assign(faIcon.style, {
              width: '30px',
              height: '26px',
              left: '0px',
            });
          });
        }
      }
    }
  
    // Functionality for updating play/pause button state
    function updatePlayPauseButtonState() {
      const coverVideoControlsBtn = document.getElementById('cover_video_controls_btn_mt');
      const isPaused = coverVideo.paused;
      const playIcon = coverVideoControlsBtn.querySelector('.fa-play');
      const pauseIcon = coverVideoControlsBtn.querySelector('.fa-pause');
      const offScreenText = coverVideoControlsBtn.querySelector('.off-screen');
  
      coverVideoControlsBtn.focus();
      playIcon.style.display = isPaused ? 'block' : 'none';
      pauseIcon.style.display = isPaused ? 'none' : 'block';
      coverVideoControlsBtn.setAttribute('aria-label', `The decorative video is currently ${isPaused ? 'paused' : 'playing'}, ${isPaused ? 'play' : 'pause'} the video`);
      offScreenText.textContent = `The decorative video is currently ${isPaused ? 'paused' : 'playing'}`;
    }
  
    // Debounce function to handle resize event
    function debounce(func, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
  
    // Call the function for creating cover video controls play/stop button
    createVideoControlsBtn();

  }

});

document.addEventListener('DOMContentLoaded', function () {

  // Slideshow control button changes
  function adjustSlideshowButton() {
    const slideshowControlBtns = document.querySelectorAll('.slideshow-controls-btn');

    slideshowControlBtns.forEach((slideshowControlBtn) => {
      const btnStyleComputed = getComputedStyle(slideshowControlBtn);

      if ((parseInt(btnStyleComputed.right) < 100 && parseInt(btnStyleComputed.left) > 250) || slideshowControlBtn.dataset.moved === 'true') {
        moveSlideshowButtonLeft(slideshowControlBtn);
      }

      // Slideshow control button aria-label and off-screen text
      setSlideshowButtonState(slideshowControlBtn);
      slideshowControlBtn.addEventListener('click', function () {
        updateSlideshowButtonState(slideshowControlBtn);
      });

    });

    // Slideshow control button move
    function moveSlideshowButtonLeft(slideshowControlBtn) {
      const slideshowHolder = slideshowControlBtn.parentNode.parentNode.parentNode;
      const faIconsSlideshowBtn = slideshowControlBtn.querySelectorAll('.fa');
      const slideshowControlBtnStyle = slideshowControlBtn.style;

      slideshowControlBtnStyle.bottom = '40px';
      slideshowControlBtnStyle.right = 'auto';
      slideshowControlBtnStyle.padding = '1px 6px';
      if (window.innerWidth > 767) {
        slideshowControlBtnStyle.left = '30px';
      } else {
        slideshowControlBtnStyle.left = '15px';
        if (slideshowHolder && slideshowHolder.classList.contains('on-cover-content')) {
          slideshowControlBtnStyle.bottom = '80px';
        }
      }
      faIconsSlideshowBtn.forEach((faIcon) => {
        faIcon.style.width = '30px';
        faIcon.style.bottom = '0';
        faIcon.style.right = '0';
      });
      // Set data-move attribute
      slideshowControlBtn.dataset.moved = 'true';
    }

    // Slideshow control button aria-label and off-screen text set or change
    function setSlideshowButtonState(slideshowControlBtn) {
      const slideshowBtnAriaLabel = slideshowControlBtn.ariaLabel;
      const slideshowBtnOffScreen = slideshowControlBtn.querySelector('.off-screen');
      const isPaused = slideshowControlBtn.classList.contains('paused');

      const ariaLabelText = `The slideshow is currently ${isPaused ? 'paused' : 'playing'}, ${isPaused ? 'play' : 'pause'} the slideshow`;
      const offScreenText = `The slideshow is currently ${isPaused ? 'paused' : 'playing'}`;

      if (!slideshowBtnAriaLabel || !slideshowBtnAriaLabel.toLowerCase().includes('the slideshow')){
        slideshowControlBtn.setAttribute('aria-label', ariaLabelText);
      } 
      if (!slideshowBtnOffScreen) {
        slideshowControlBtn.innerHTML += `<span class='off-screen'>` + offScreenText + `</span>`;
      } else if (!slideshowBtnOffScreen.textContent.toLowerCase().includes('the slideshow')) {
        slideshowBtnOffScreen.textContent = offScreenText;
      };
    }
    function updateSlideshowButtonState(slideshowControlBtn) {
      const slideshowBtnOffScreen = slideshowControlBtn.querySelector('.off-screen');
      const isPaused = slideshowControlBtn.classList.contains('paused');

      slideshowControlBtn.ariaLabel = `The slideshow is currently ${isPaused ? 'paused' : 'playing'}, ${isPaused ? 'play' : 'pause'} the slideshow`;
      slideshowBtnOffScreen.textContent = `The slideshow is currently ${isPaused ? 'paused' : 'playing'}`;
    }
  }

  // Video volume button changes
  function adjustVideoVolumeButton() {
    const videoVolumeFaOff = document.querySelector('.fa-volume-off');
    if (!videoVolumeFaOff) {
      return;
    }

    const videoVolumeBtn = videoVolumeFaOff.parentNode;

    // Video volume button move to the left
    const btnStyleComputed = getComputedStyle(videoVolumeBtn);
    const videoVolumeBtnStyle = videoVolumeBtn.style;
    if ((parseInt(btnStyleComputed.right) < 100 && parseInt(btnStyleComputed.left) > 250) || videoVolumeBtn.dataset.moved === 'true') {     
      moveVideoVolumeButtonLeft()
    }

    // Video volume button aria-label and off-screen text update
    const videoVolumeBtnAriaLabel = videoVolumeBtn.ariaLabel;
    const videoVolumeBtnOffScreen = videoVolumeBtn.querySelector('.off-screen');

    setVideoVolumeButtonState();
    videoVolumeBtn.addEventListener('click', function () {
      updateVideoVolumeButtonState();
    });

    // Video volume button move
    function moveVideoVolumeButtonLeft() {
      videoVolumeBtnStyle.padding = '1px 6px';
      videoVolumeBtnStyle.right = 'auto';
      if (window.innerWidth > 767) {
        videoVolumeBtnStyle.bottom = '21px';
        videoVolumeBtnStyle.left = '70px';
      } else {
        videoVolumeBtnStyle.bottom = '9px';
        videoVolumeBtnStyle.left = '50px';
      }

      // Set consistent/matching style for video volume button if needed
      const faOffStyleComputed = getComputedStyle(videoVolumeFaOff);

      if(parseInt(faOffStyleComputed.bottom) !== 0 || videoVolumeBtn.dataset.resized === 'true'){

        const faIconsVideoVolumeBtn = videoVolumeBtn.querySelectorAll('.fa');
        const videoVolumeFaOn = document.querySelector('.fa-volume-up');

        videoVolumeFaOff.style.bottom = '0';
        videoVolumeFaOff.style.right = '0';
        videoVolumeFaOn.style.bottom = '0';
        videoVolumeFaOn.style.right = '-12px';

        if (window.innerWidth > 767) {
          videoVolumeBtnStyle.width = '45px';
          videoVolumeBtnStyle.height = '45px';
          videoVolumeBtnStyle.fontSize = '3.5em';

          faIconsVideoVolumeBtn.forEach((faIcon) => {
            faIcon.style.width = '45px';
            faIcon.style.height = '45px';
          });

          if (window.innerWidth <= 1024) {
            videoVolumeBtnStyle.fontSize = '3em';
          }
        } else {
          videoVolumeBtnStyle.width = '30px';
          videoVolumeBtnStyle.height = '30px';
          videoVolumeBtnStyle.fontSize = '33px';

          faIconsVideoVolumeBtn.forEach((faIcon) => {
            faIcon.style.width = '30px';
            faIcon.style.height = '30px';
          });

          videoVolumeFaOn.style.right = '-8px';
        }
        // Set data-resized attribute
        videoVolumeBtn.dataset.resized = 'true';
      }
      // Set data-move attribute
      videoVolumeBtn.dataset.moved = 'true';
    }
    
    // Video volume button aria-label and off-screen text set or change
    function setVideoVolumeButtonState() {
      const isMuted = videoSection.muted;
      const ariaLabelText = `The decorative video sound is ${isMuted ? 'off' : 'on'}, turn it ${isMuted ? 'on' : 'off'}`;
      const offScreenText = `The decorative video sound is ${isMuted ? 'off' : 'on'}`;
      
      if (!videoVolumeBtnAriaLabel || !videoVolumeBtnAriaLabel.toLowerCase().includes('the decorative video')){
        videoVolumeBtn.setAttribute('aria-label', ariaLabelText);
      } 
      if (!videoVolumeBtnOffScreen) {
        videoVolumeBtn.innerHTML += `<span class='off-screen'>` + offScreenText + `</span>`;
      } else if (!videoVolumeBtnOffScreen.textContent.toLowerCase().includes('the decorative video')) {
        videoVolumeBtnOffScreen.textContent = offScreenText;
      };
    }
    function updateVideoVolumeButtonState() {
      const isMuted = videoSection.muted;

      videoVolumeBtn.ariaLabel = `The decorative video sound is ${isMuted ? 'off' : 'on'}, turn it ${isMuted ? 'on' : 'off'}`;
      videoVolumeBtnOffScreen.textContent = `The decorative video sound is ${isMuted ? 'off' : 'on'}`;
    }
  }

  // Debounce function to delay execution of a function
  function debounceF(func, delay) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }

  const slideshowSection = document.querySelector('.slideshow-v2-wrapper');
  if (slideshowSection) {
    adjustSlideshowButton();
    window.addEventListener('resize', debounceF(adjustSlideshowButton, 300));
  }

  const videoSection = document.getElementById('coverVideo');
  if (videoSection && !videoSection.hasAttribute('controls')) {
    adjustVideoVolumeButton();
    window.addEventListener('resize', debounceF(adjustVideoVolumeButton, 300));
  }

});