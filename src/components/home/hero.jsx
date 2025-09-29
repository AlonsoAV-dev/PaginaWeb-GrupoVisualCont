import HeroCarousel from '../../shared/heroCarousel';
import "../../css/baseCarousel.css"

const OPTIONS = { loop: true, duration: 30 }
const SLIDE_COUNT = 3
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

function Hero() {
    return (
        <HeroCarousel
            slides={SLIDES}
            options={OPTIONS}
        />
    );
}

export default Hero;
