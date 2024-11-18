import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import Component from './components/Component';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
import '../public/styles/main.scss';
import About from './components/main/About';
import Requirements from './components/main/Requirements';
import { v4 } from 'uuid';
import NaflowsPicker from '../public/@components/picker';
import Maps from './components/main/Maps';
import NaflowsButton from '../public/@components/button';
import ChangeLogs from './components/main/Changelogs';


function App() {

  const [components, setComponents] = useState([])
  const [value, setValue] = useState("About");
  const sectionRefs = useRef([]);
  const [lastVersion, setLastVersion] = useState();

  const [headerWidth, setHeaderWidth] = useState(0);

  useEffect(() => {
    fetch("../../../public/releases.json").then(
        (response) => response.json()
    ).then((data) => {
        setLastVersion(data[0]);
    }).catch((err) => {
        console.error(err);
    });
}, []);

  useEffect(() => {
    // Intersection Observer options
    const options = {
      root: null, // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the element is in view
    };

    // Create the IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id);
          setValue(entry.target.id); // Update the value to the id of the element in view
        }
      });
    }, options);

    // Observe all elements in sectionRefs
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref); // Observe only if the ref is not null
    });

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this effect runs once


  useEffect(() => {
    fetch("../public/path/components.json")
      .then((response) => response.json())
      .then((data) => {
        if (components.length === 0) {
          const componentPromises = data.map((component) =>
            fetch(component.path)
              .then((response) => response.text())
              .then((code) => {
                component.code = code;
                return fetch(component.usage)
                  .then((response) => response.text())
                  .then((usage) => {
                    component.usage = usage;
                    component.path_to_code = 
                      (lastVersion?.link?.replace('https://public.naflows.com/@library/','') || '')
                     + "@components/" + component.name.toLowerCase() + ".jsx";
                    return component;
                  });
              })
          );
  
          Promise.all(componentPromises).then((fetchedComponents) => {
            setComponents(fetchedComponents);
          });
        }
      });
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
        const y = window.scrollY;
        const header = document.querySelector('.app-header');
        if (header) {
            const buttonsContainer = header.querySelector(".buttons-directory");
            if (y > 50) {
                header.classList.add('scrolling');
            } else {
                header.classList.remove('scrolling');
            }
        } else {
          alert("Header not found");
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);


  return (
    <>
      <div className="app-picker">
        <div className='top-column'>
          <NaflowsPicker
              parameters={{
                slideType: 'vertical',
                justifyContent: 'start',
                property : 'menu',
                slideStyle : "line",
                autoWidth : true
              }}
              options={[
                { "Getting Started": [
                  { content: "About" },
                  { content: "Requirements" }
                ]},
                {
                  "General use" : [
                    { content: "Maps" },
                  ]
                },
                { "Components": 
                    components ? components.map((component) => ({ content: component.name })) :
                    [{ content: "Loading..." }]
                }, 
                {
                  "Others" : [
                    { content : "Changelog" },
                  ]
                }
              ]}
              onChange={(val) => {
                const element = document.getElementById(val);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setValue(val);
                }
              }}
              value={value}
          />
        </div>
      </div>
      <div className="app-header">
        <div className="top-row">
          <img src="https://public.naflows.com/@assets/logo/naflows_long_logotype.svg" />
        </div>
        <div className="buttons-directory">
          <div className="bottom-row">
            <NaflowsButton
              type='primary'
              content={[<><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/></svg></>]}
              onUserClick={() => {
                window.open(lastVersion?.link, '_blank');
              }}
            />
            <NaflowsButton
              type='primary'
              content={[<><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/></svg></>]}
              onUserClick={() => {
                window.open('https://github.com/W0lfan/Naflows-Resources');
              }}
            />
            <NaflowsButton
              type='primary'
              content={[<><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><path fill="#fff" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg></>]}
              onUserClick={() => {
                window.open('https://discord.gg/5k8aFS9DbK');
              }}
            />
          </div>
        </div>
      </div>
      <div className="app">
        <div className="welcome-screen">
          <div id="About" ref={(el) => (sectionRefs.current[0] = el)}>
            <About lastVersion={lastVersion} />
          </div>
          <div id="Requirements" ref={(el) => (sectionRefs.current[1] = el)}>
            <Requirements />
          </div>
          <div id="Maps" ref={(el) => (sectionRefs.current[2] = el)}>
            <Maps />
          </div>
        </div>
        { components ?
          components.map((component, index) => {
            return (
              <div id={component.name} key={index} ref={(el) => (sectionRefs.current[index + 3] = el)}>
                <Component key={index} component={component} />
              </div>
            )
          }) : "Loading..."
        }
        <div id="Changelog" ref={(el) => (sectionRefs.current[sectionRefs.current.length+1] = el)}> 
          <ChangeLogs />
        </div>
      </div>
    </>
  )
}

export default App
