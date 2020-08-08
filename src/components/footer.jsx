import React from 'react'

// import icons
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

// import styles
import '../styles/footer.css'

function Footer () {
    return (
        <div className="footer-container">
            <h1 className="copyright">Copyright 2020 © alee0510</h1>
            <ul>
                <li><InstagramIcon fontSize="small"/></li>
                <li><FacebookIcon fontSize="small"/></li>
                <li><TwitterIcon fontSize="small"/></li>
                <li><GitHubIcon fontSize="small"/></li>
            </ul>
        </div>
    )
}

export default Footer