import Button from "../../../public/@components/button";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function About({
    ref
}) {



    return (
        <div className="usage-informations" ref={ref}>
        <div className="usage-informations-header">
            <div className="title">
                About
            </div>
            <div className="sub-title">
                Welcome to Naflows' Library documentation. Here you can find all the information you need to start using the library.
            </div>
        </div>
        <div className="usage-informations-description">
        <div className="paragraph">
                <div className="paragraph-title">
                    The Naflows projects
                </div>
                <div className="paragraph-content">
                    Naflows is project of wedesign and a coding developement trying to create beautiful and modern user interfaces.<br />
                    The lead developer of the project is <a href="https://github.com/W0lfan/">naflouille</a>, a young developer who is passionate about design and coding,
                    and is working for more than {new Date().getFullYear() - 2020} years in the field. He is a self-taught developer who is always looking for new challenges and new projects to work on.
                    <br />
                    Naflouille's works were previously known under the name of "Naflouille Creations", but he decided to change the name to "Naflows" to make it more professional and to make it easier to remember.
                </div>
            </div>
            <div className="paragraph">
                <div className="paragraph-title">
                    Naflows' Library
                </div>
                <div className="paragraph-content">
                    Naflows' Library is a design system and a component library that provides you with the tools you need to create a modern and beautiful user interface.
                    <br />
                    The library is built with React and SCSS, and it provides you with a set of components that you can use to create your own projects.
                    <br />
                    The library is constantly updated and new components are added regularly, so make sure to check for updates regularly.
                    <br />
                    This library will soon also provide a set of templates, icons, designs that you can use to create your own projects. Stay tuned for more information.
                </div>
            </div>
            <div className="paragraph">
                <div className="paragraph-title">
                    Inspiration and contributions
                </div>
                <div className="paragraph-content">
                    Naflows' Library is inspired by many other design systems and component libraries, such as Material-UI.
                    <br />
                    The library is open-source, so if you want to contribute to the project, you can do so by creating a pull request on the GitHub repository.
                    <br />
                    If you have any suggestions or feedback, feel free to contact us via email or on GitHub.
                </div>
            </div>
        </div>
    </div>
    )
}

About.propTypes = {
    ref: PropTypes.object,
    lastVersion: PropTypes.object
}