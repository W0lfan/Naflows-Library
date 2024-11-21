import PropTypes from 'prop-types';
import NaflowsButton from '../../../../public/@components/button';
import '../../../../public/styles/components/main/context/app-header.scss';

export default function AppHeader ({
    lastVersion
}) {
    return (
        <div className="app-header">
            <div className="top-row">
            <img src="https://public.naflows.com/assets/corporate/naflows_small_logotype.png" />
            </div>
            <div className="buttons-directory">
            <div className="bottom-row">
                <NaflowsButton
                    type='tertiary'
                    content={["Github"]}
                    onUserClick={() => {
                        window.open('https://github.com/W0lfan/Naflows-Resources');
                    }}
                />
                <NaflowsButton
                type='tertiary'
                content={["Discord"]}
                onUserClick={() => {
                    window.open('https://discord.gg/5k8aFS9DbK');
                }}
                />
            </div>
            </div>
        </div>
    )
}

AppHeader.propTypes = {
    lastVersion: PropTypes.object
}