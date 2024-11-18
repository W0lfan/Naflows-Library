import Button from "../../../public/@components/button";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Requirements({
    ref
}) {
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

    return (
        <div className="usage-informations" ref={ref}>
        <div className="usage-informations-header">
            <div className="title">
                Requirements
            </div>
            <div className="sub-title">
                Before you start using the library, make sure you have the following requirements.
            </div>
        </div>
        <div className="requirements">
            <div className="requirement">
                <div className="requirement-number">
                    1
                </div>
                <div className="requirement-header">
                    <div className="requirement-name">
                        Download the library
                    </div>
                    <div className="requirement-description">
                        Downloading the library is crucial for you to use the components and the design system.
                        Regularly check for updates and download the latest version.
                    </div>
                </div>
                <div className="latest-version-informations">
                    <div className="informations">
                        <div className="version">
                            <div className="sub-title">
                                Latest version
                            </div>
                            <div className="value">
                                {lastVersion ? lastVersion.version : 'Loading...'}
                            </div>
                        </div>
                        <div className="date">
                            <div className="sub-title">
                                Release date
                            </div>
                            <div className="value">
                                {lastVersion ? lastVersion.date : 'Loading...'}
                            </div>
                        </div>
                        <div className="changes">
                            <div className="sub-title">
                                Changes
                            </div>
                            <div className="value">
                                {lastVersion ? lastVersion.changes.map(($,i)=>(<span key={i}>{$}</span>)) : 'Loading...'}
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                        content={[
                            <>
                                <div className="text">
                                    Download
                                </div>
                            </>
                        ]}
                        style={{
                            paddingRight: '20px',
                        }}
                        type="primary"
                        onUserClick={() => {
                            console.log(lastVersion?.link);
                            window.open(lastVersion?.link, '_blank');
                        }}
                    />
            </div>
            <div className="requirement">
                <div className="requirement-number">
                    2
                </div>
                <div className="requirement-header">
                    <div className="requirement-name">
                        Basic knowledge of React
                    </div>
                    <div className="requirement-description">
                        The library is built on React. You need to have basic knowledge of React to use the components and the design system.
                        <br/>
                        If needed, a Discord server is available for you to ask questions and get help.
                    </div>
                </div>
                <Button 
                        content={["Join the Discord server"]}
                        type="primary"
                        onUserClick={() => {
                            window.open('https://discord.gg/5k8aFS9DbK');
                        }}
                    />
            </div>
            <div className="requirement">
                <div className="requirement-number">
                    3
                </div>
                <div className="requirement-header">
                    <div className="requirement-name">
                        Implement Naflows' Library
                    </div>
                    <div className="requirement-description">
                        In order to use the components and the design system, you need to implement the library in your project.
                        After downloading the library, extract the files and put them in your project.
                        The imports must require for you to open the components.
                        The use of the library is described in this documentation.
                    </div>
                </div>
                <Button
                    content={["Start learning"]}
                    type="primary"
                    onUserClick={() => {
                        const maps = document.getElementById('Maps');
                        maps.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
            </div>
        </div>
    </div>
    )
}

Requirements.propTypes = {
    ref: PropTypes.object
}