import { useEffect, useState } from "react";


export default function ChangeLogs({}) {
    const [versions, setVersions] = useState();
    useEffect(() => {
        fetch("../../../public/releases.json").then(
            (response) => response.json()
        ).then((data) => {
            data.sort((a, b) => data.indexOf(b) - data.indexOf(a));
            setVersions(data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div className="usage-informations">
            <div className="usage-informations-header">
                <div className="title">
                    Changelogs
                </div>
                <div className="sub-title">
                    The changelogs of the library are listed below.
                </div>
            </div>
            <div className="changelogs">
                {versions ? versions.map((version, index) => (
                    <div className="changelog" key={index}>
                        <div className="version">
                            <div className="sub-title">
                                Version
                            </div>
                            <div className="value">
                                {version.version}
                            </div>
                        </div>
                        <div className="date">
                            <div className="sub-title">
                                Release date
                            </div>
                            <div className="value">
                                {version.date}
                            </div>
                        </div>
                        <div className="changes">
                            <div className="sub-title">
                                Changes
                            </div>
                            <div className="value">
                                {version.changes.map((change, index) => (
                                    <li key={index}>{change}</li>
                                ))}
                            </div>
                        </div>
                        {
                            version.whatscoming ? (
                                <div className="whats-coming">
                                    <div className="sub-title">
                                        What's coming
                                    </div>
                                    <div className="value">
                                        {version.whatscoming.map((change, index) => (
                                            <li key={index}>{change}</li>
                                        ))}
                                    </div>
                                </div>
                            ) : ''
                        }
                    </div>
                )) : <div>Loading...</div>}
            </div>
        </div>
    )
}