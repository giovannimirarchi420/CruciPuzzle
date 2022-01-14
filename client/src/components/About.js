import "../App.css"
const About = () => {

    const text = <>
                    <p>This game was made for the "Web Application I" classes for the Master Degree in
                        Computer Engineering in Polytechnic of Turin.</p>
                    <p>Author: Giovanni Mirarchi</p>
                    <p>Date: 19/01/2022</p>
                </>

    return (
        <>
            <center>
                <h2 className={"about-title"}>About this game</h2>
                <p className={"about-text"}>{text}</p>
            </center>
        </>
    );
}

export default About;