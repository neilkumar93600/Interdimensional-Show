import React, {useEffect} from 'react';
import '../style/Music24.css'; // Adjust the path if necessary


const Music24 = () => {
  useEffect(() => {
    const scripts = [
        'https://groove.suno.com/_next/static/chunks/webpack-21cb5e9eefc1ac15.js',
        'https://groove.suno.com/_next/static/chunks/fd9d1056-fd531a70881deb16.js',
        'https://groove.suno.com/_next/static/chunks/69-3ea07eac4acb1044.js',
        'https://groove.suno.com/_next/static/chunks/main-app-56cb93bd04da17aa.js',
        'https://groove.suno.com/_next/static/chunks/a342680c-4f94ec8d414b8147.js',
        'https://groove.suno.com/_next/static/chunks/551-696a9cc29d5e7d58.js',
        'https://groove.suno.com/_next/static/chunks/app/page-51d4f853433b31a4.js',
        'https://groove.suno.com/_next/static/chunks/app/layout-364670984b27acdb.js',
        'https://groove.suno.com/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js'
    ];

    scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    });

    // Add additional scripts as needed
    const additionalScripts = [
        // You can add the inline scripts or any additional logic here
    ];

    additionalScripts.forEach((code) => {
        const script = document.createElement('script');
        script.innerHTML = code;
        document.body.appendChild(script);
    });

    // Cleanup function to remove scripts if needed
    return () => {
        scripts.forEach((src) => {
            const script = document.querySelector(`script[src="${src}"]`);
            if (script) {
                document.body.removeChild(script);
            }
        });
    };
}, []);
  return (
    <div className="__classNameName_c0a3f7">
      <div className="page_main__GlU4n">
        <div className="page_logoContainer__S8bF9" aria-label="Suno Button">
          <a href="/Frontend/src/pages/Home.js" rel="noopener noreferrer" aria-label="Visit Suno homepage">
            <img
              src="../asset/logo.png"
              alt="Logo"
            />
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: "-100px" }}>
          <div className="diskContainer">
            <div
              className="disk"
              style={{
                transform: "rotate(320.0448635913821deg)",
                transformOrigin: "center",
                transition: "transform 1s ease-out",
              }}
              tabIndex="0"
            >
              <div
                className="genreItem"
                style={{
                  position: "absolute",
                  width: "319.59375px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(0deg) translate(905.916875px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                acoustic chicago blues cape verdean
              </div>
              <div
                className="genreItem"
                style={{
                  position: "absolute",
                  width: "143.6875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(0deg) translate(1067.5575px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#D71AA0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                afro-jazz
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "220.7578125px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(0deg) translate(1179.78015625px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#8936F0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ambient house 16-bit
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "175.6171875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(0deg) translate(1307.96765625px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                arabic reggae
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "116.453125px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(0deg) translate(1384.0028125px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#D71AA0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                rock
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "174.0546875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(2deg) translate(833.14734375px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#8936F0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                electro-jungle
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "208.2890625px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(2deg) translate(954.31921875px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                hindi southern rock
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "226.21875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(2deg) translate(1101.573125px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#D71AA0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                portuguese breakbeat
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "223.8671875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(2deg) translate(1256.61609375px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#8936F0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                korean pacific reggae
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "174.0390625px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(2deg) translate(1385.56921875px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                surf flamenco
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "230.8515625px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(4deg) translate(861.54578125px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                instrumental bluegrass
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "154.59375px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(4deg) translate(984.2684375px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#D71AA0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                cajun griot
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "163.921875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(4deg) translate(1073.52625px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#8936F0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                choral celtic
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "224.6328125px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(4deg) translate(1197.80359375px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                dakar afro-cuban jazz
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "252.671875px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(6deg) translate(872.4559375px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#D71AA0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                hypnagogic pacific reggae
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "161.609375px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(6deg) translate(1009.5965625px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#8936F0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                koto gnawa
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "212.9765625px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(6deg) translate(1126.88953125px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#DA214A",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                new orleans grunge
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "225.4140625px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(6deg) translate(1276.08484375px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#D71AA0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                prog avant-garde jazz
              </div>
              <div className="genreItem"
                style={{
                  position: "absolute",
                  width: "187.2890625px",
                  height: "16px",
                  transform: "translate(-50%, -50%) rotate(8deg) translate(839.76453125px)",
                  fontFamily: "Roobert",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#8936F0",
                  backgroundColor: "transparent",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                dark goa trance
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '176.3671875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(8deg) translate(951.59265625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy swing
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '172.5234375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(8deg) translate(1056.03796875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                garage tango
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '182.6171875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(8deg) translate(1163.60828125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                grunge cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '206.7578125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(8deg) translate(1288.29578125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                shoegaze psybient
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '288.4609375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(10deg) translate(890.35046875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic chicago blues algorave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '145.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(10deg) translate(1037.2059375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                afro-funk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '212.984375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(10deg) translate(1146.323125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ambient dub techno
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '155.3828125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(10deg) translate(1260.50671875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '185.7421875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(10deg) translate(1361.06921875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                reggaetonwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '191.9296875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(12deg) translate(842.08484375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                classNameical cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '160.8359375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(12deg) translate(948.46765625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hindi jungle
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '234.77px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(12deg) translate(1076.27px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                portuguese barbershop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '191.93px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(12deg) translate(1219.62px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                russian dembow
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '170.13px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(12deg) translate(1330.66px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                surf classical
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '150.70px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(14deg) translate(821.47px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                bluegrass
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '181.06px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(14deg) translate(917.35px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cajun algorave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '185.74px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(14deg) translate(1030.75px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                choral big band
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '173.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(14deg) translate(1140.25px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cumbia metal
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '231.66px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(16deg) translate(861.95px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hypnagogic goa trance
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '159.26px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(16deg) translate(987.41px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                koto g-funk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '222.29px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(16deg) translate(1108.19px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                new orleans dembow
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '237.08px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(16deg) translate(1267.88px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                prog ambient noise wall
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '186.50px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(18deg) translate(839.37px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dark electropop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '166.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(18deg) translate(945.75px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy soul
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '133.59px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(18deg) translate(1025.68px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                garage
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '219.99px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(18deg) translate(1132.47px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                grunge bedroom pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '199.74px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(18deg) translate(1272.34px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                shoegaze cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '230.86px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(20deg) translate(861.55px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic chicago blues
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '216.84px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(20deg) translate(1015.40px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                afro-cuban jazz griot
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '212.99px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(20deg) translate(1160.32px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ambient dub boogie
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '184.9296875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(20deg) translate(1289.28796875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic mariachi
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '202.0703125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(20deg) translate(1412.78796875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                reggae dirty south
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '185.703125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(22deg) translate(838.9715625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                choral afro-jazz
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '190.40625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(22deg) translate(957.02625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hindi dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '245.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(22deg) translate(1105.0496875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                portuguese acoustic rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '161.59375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(22deg) translate(1238.666875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                urdu rumba
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '205.9453125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(22deg) translate(1352.43640625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                surf acoustic blues
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '241.7578125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(24deg) translate(866.99890625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                big band new jack swing
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '207.5078125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(24deg) translate(1021.63171875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cajun afrikaner folk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '214.5234375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(24deg) translate(1162.64734375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                choral bedroom pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '227.7421875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(24deg) translate(1313.78015625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cumbia acoustic blues
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '209.1015625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(26deg) translate(850.67078125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hypnagogic garage
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '202.84375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(26deg) translate(986.6434375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                koto drill and bass
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '226.9765625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(26deg) translate(1131.55359375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                new orleans cloud rap
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '173.2890625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(26deg) translate(1261.68640625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                prog afrobeat
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '133.59375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(26deg) translate(1345.1278125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                reggae
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '213.734375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(28deg) translate(852.9871875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dark drum and bass
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '201.2890625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(28deg) translate(990.49890625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy shoegaze
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '189.6171875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(28deg) translate(1115.95203125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                electro-chanson
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '202.8515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(28deg) translate(1242.18640625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#D71AA0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                grunge americana
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '216.875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(28deg) translate(1382.0496875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                shoegaze boom bap
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '194.2734375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(30deg) translate(843.25671875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic carnatic
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '171.4375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(30deg) translate(961.24515625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                new orleans funk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '202.4375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(30deg) translate(1077.04140625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                choral progressive rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '187.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(30deg) translate(1212.9796875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cumbia noise rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '162.46875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(30deg) translate(1324.1315625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                garage punk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '210.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(32deg) translate(865.028125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy synthpop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '176.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(32deg) translate(986.615625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                koto indie rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '189.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(32deg) translate(1093.134375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic hick hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '170.7109375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(32deg) translate(1206.3265625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dakar cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '212.5390625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(34deg) translate(859.50625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                psychedelic latin
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '191.609375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(34deg) translate(979.8596875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '226.484375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(34deg) translate(1088.8046875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                surf ambient
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '218.9375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(34deg) translate(1244.878125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hip hop cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '176.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(36deg) translate(845.6328125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                grunge stoner rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '166.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(36deg) translate(978.5684375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                tropicalia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '190.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(36deg) translate(1089.3921875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cumbia chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '227.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(38deg) translate(843.9046875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic dreamy
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '155.421875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(38deg) translate(980.0984375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy bluegrass
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '209.953125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(38deg) translate(1105.728125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hip hop folk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '227.6171875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(38deg) translate(1252.9165625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic surf
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '188.84375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(40deg) translate(842.73828125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                shamanic dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '200.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(40deg) translate(975.36484375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic shoegaze
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '186.3125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(40deg) translate(1102.54375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy synthwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '226.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(40deg) translate(1251.303125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                indie funk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '171.59375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(42deg) translate(838.03125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '155.03125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(42deg) translate(970.5921875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                nu disco
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '168.453125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(42deg) translate(1079.0796875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic darkwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '230.4921875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(42deg) translate(1236.3125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                big band disco
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '201.953125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(44deg) translate(843.86875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '177.7109375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(44deg) translate(973.046875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                shoegaze dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '198.5625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(44deg) translate(1086.64140625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                psychedelic cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '177.703125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(44deg) translate(1231.53046875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '200.5078125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(46deg) translate(858.8984375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                big band
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '164.578125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(46deg) translate(982.3046875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                cumbia pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '179.5625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(46deg) translate(1095.31875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy indie
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '200.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(46deg) translate(1230.4859375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                electronic jazz
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '170.4765625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(48deg) translate(841.421875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                punk rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '178.484375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(48deg) translate(965.703125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy bossa nova
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '162.0546875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(48deg) translate(1080.5390625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chillout
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '187.2890625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(48deg) translate(1233.546875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '207.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(50deg) translate(842.390625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '227.84375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(50deg) translate(972.6875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '199.375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(50deg) translate(1085.6015625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill jazzy
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '211.0625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(52deg) translate(844.921875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                new orleans indie
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '175.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(52deg) translate(962.265625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy new wave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '167.0546875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(52deg) translate(1076.78125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                surf jazz
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '221.65625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(52deg) translate(1231.84375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                indie lo-fi
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '159.015625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(54deg) translate(842.84375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic alternative
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '181.65625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(54deg) translate(961.953125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy afrobeat
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '206.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(54deg) translate(1088.484375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy celtic
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '220.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(56deg) translate(848.640625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                funk pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '180.609375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(56deg) translate(962.59375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                indie dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '218.609375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(56deg) translate(1079.453125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                psychedelic dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '180.625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(58deg) translate(851.6875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                surf electro
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '206.5px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(58deg) translate(965.984375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '215.5px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(58deg) translate(1081.1875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                electro hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '199.40625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(60deg) translate(844.390625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '207.5625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(60deg) translate(962.765625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                experimental cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '198.375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(60deg) translate(1086.484375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                indie cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '186.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(62deg) translate(844.53125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chillout cumbia
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '210.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(62deg) translate(965.078125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                reggae chill
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '179.7109375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(62deg) translate(1077.515625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                electro world
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '218.6484375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(62deg) translate(1241.609375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy surf
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '186.0625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(64deg) translate(845.984375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                punk chill
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '200.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(64deg) translate(970.09375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '195.5078125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(66deg) translate(842.9375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '166.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(66deg) translate(970.4375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill wave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '178.75px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(66deg) translate(1086.15625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '190.5px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(68deg) translate(843.875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                hip hop reggae
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '167.0625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(68deg) translate(973.625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                alternative pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '210.1875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(68deg) translate(1081.0625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy dream
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '176.953125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(70deg) translate(842.375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '185.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(70deg) translate(970.4375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dark ambient
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '209.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(70deg) translate(1087.140625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                post-rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '182.4375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(72deg) translate(843.265625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dream pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '218.984375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(72deg) translate(968.15625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                acoustic indie
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '201.953125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(72deg) translate(1084.515625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                celtic chill
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '204.84375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(74deg) translate(844.890625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '176.953125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(74deg) translate(973.96875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                synthpop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '197.609375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(74deg) translate(1091.46875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                reggae chillout
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '223.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(76deg) translate(843.515625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dream pop chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '199.453125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(76deg) translate(964.6875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                arabic chill
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '211.015625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(76deg) translate(1082.171875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chillwave pop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '178.75px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(78deg) translate(843.5625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '212.1875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(78deg) translate(965.84375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                surf hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '201.84375px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(78deg) translate(1087.015625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ambient chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '226.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(80deg) translate(847.84375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dark jazzy
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '204.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(80deg) translate(971.78125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill electro
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '185.5px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(80deg) translate(1088.625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                celtic chillout
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '202.65625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(82deg) translate(844.6875px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy hip hop
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '217.0625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(82deg) translate(973.640625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill post-rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '167.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(82deg) translate(1086.828125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                pop funk
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '193.5px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(84deg) translate(842.84375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill disco
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '210.6875px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(84deg) translate(965.0625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill jazzy
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '175.75px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(84deg) translate(1082.484375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                post-rock chill
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '221.640625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(86deg) translate(843.84375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill post-rock
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '211.015625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(86deg) translate(971.953125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ambient jazz
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '182.75px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(86deg) translate(1088.484375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                jazzy chillout
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '204.0625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(88deg) translate(844.78125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                experimental chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '223.25px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(88deg) translate(965.0625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dark experimental
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '186.40625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(88deg) translate(1087.078125px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                indie chillwave
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '200.515625px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(90deg) translate(844.515625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                synthpop chill
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '173.328125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(90deg) translate(968.4375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chill psychedelic
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '191.125px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(90deg) translate(1085.859375px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#8936F0',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                chillhouse
              </div>
              <div className="genreItem"
                style={{
                  position: 'absolute',
                  width: '210.5px',
                  height: '16px',
                  transform: 'translate(-50%, -50%) rotate(92deg) translate(842.5625px)',
                  fontFamily: 'Roobert',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#DA214A',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                dreamy disco
              </div>
              </div>
          </div>
          <div style={{ position: 'absolute', maxWidth: '400px', display: 'flex', flexDirection: 'column', zIndex: 10, marginLeft: '200px', marginBottom: '100px' }}>
            <div className="headerBanner">
              <div className="headerText">Explore <span className="highlight">Music 24/7</span></div>
              <div className="headerSubText">Here&#x27;s a small taste (or whatever the listening equivalent is) of what's possible</div>
            </div>
            <div className="musicPlayerModal" style={{ border: 'none' }}>
              <audio src="" preload="auto"></audio>
              <div style={{ height: '18px' }}></div>
              <div className="musicPlayerHeaderBeforeRoll">Pick a style, or roll the dice...</div>
              <div className="musicPlayerTitle"
                style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  fontFamily: 'Roobert-SemiMono',
                  marginBottom: '20px',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }} title="">
                <span></span>
              </div>
              <div className="outerMusicPlayerControls">
                <div aria-label="Sound" className="soundButton"
                  style={{ backgroundImage: "url('https://cdn1.suno.ai/groove-assets/public/icons/Unmute.svg')" }}>
                </div>
                <div className="musicPlayerControls">
                  <button aria-label="Previous song" className="prevSongButton"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.10)', border: 'none', cursor: 'default' }}
                    disabled="">
                  </button>
                  <div aria-label="Play" className="playPauseButton"
                    style={{
                      backgroundImage: "url('https://cdn1.suno.ai/groove-assets/public/icons/Union.svg'), linear-gradient(85deg, #DA214A 15.2%, #8936F0 88.5%)",
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '40%, cover'
                    }}>
                  </div>
                  <button aria-label="Next song" className="nextSongButton"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.10)', border: 'none', cursor: 'default' }}
                    disabled="">
                  </button>
                </div>
                <div className="emptyPlaceholder"
                  style={{ border: 'none', borderRadius: '50%', cursor: 'pointer', width: '30px', height: '30px' }}>
                </div>
              </div>
              <div className="musicPlayerProgress">
                <div className="musicPlayerProgressBar" style={{ width: '0%' }}></div>
              </div>
              <div className="dotIndicators"></div>
            </div>
            <div className="linkButton" aria-label="Suno Button" role="button" tabIndex="0">What will you create?</div>
            <div style={{ marginTop: '10px' }}>
              <div className="footer">
                <div className="footer_text">© 2024 Suno, Inc.</div>
                <a href="https://suno.com/terms" className="footer_link">Terms of Service</a>
                <a href="https://suno.com/privacy" className="footer_link">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music24;