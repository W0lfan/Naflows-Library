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

  return (
    <>
      <div className="app-picker">
        <div className='top-column'>
          <img src="https://public.naflows.com/@assets/logo/naflows_long_logotype.svg" />
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
                    components.map((component) => ({ content: component.name })) 
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
        <div className="bottom-row">
          <NaflowsButton
            type='primary'
            content={['Download']}
            onUserClick={() => {
              window.open(lastVersion?.link, '_blank');
            }}
          />
          <NaflowsButton
            type='primary'
            content={['GitHub']}
            onUserClick={() => {
              window.open('https://github.com/W0lfan/Naflows-Resources');
            }}
          />
          <NaflowsButton
            type='primary'
            content={['Discord']}
            onUserClick={() => {
              window.open('https://discord.gg/5k8aFS9DbK');
            }}
          />
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
        {
          components.map((component, index) => {
            return (
              <div id={component.name} key={index} ref={(el) => (sectionRefs.current[index + 3] = el)}>
                <Component key={index} component={component} />
              </div>
            )
          })
        }
        <div id="Changelog" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}> 
          <ChangeLogs />
        </div>
      </div>
    </>
  )
}

export default App
