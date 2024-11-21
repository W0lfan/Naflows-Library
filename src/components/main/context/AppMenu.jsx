import PropTypes from 'prop-types';
import NaflowsPicker from '../../../../public/@components/picker';
import '../../../../public/styles/components/main/context/app-menu.scss';


export default function AppMenu ({ components, setValue, value }) {
    return (
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
    )
}

AppMenu.propTypes = {
    components: PropTypes.array,
    setValue: PropTypes.func,
    value: PropTypes.string
}