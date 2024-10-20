import './Body.css'
import Burger from './Burger'
import Navbar from './Navbar'
import CustomCursor from './CustomCursor';
import Title from './Title'
import Subtitle from './Subtitle'
import Icons from './Icons'
import Footer from './Footer'

function Body() {
    return (
        <>
            <Burger />
            <Navbar />
            <CustomCursor />
            <main>
                <div className='splash-container'>
                    <div className='splash'>
                        <Title />
                        <Subtitle />
                        <Icons />
                        {/* <Footer /> */}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Body