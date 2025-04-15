// import 'yet-another-react-lightbox/styles.css';

import './styles.css';

import ReactLightbox, { useLightboxState } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { Box } from '@mui/material';

import { Iconify } from '../iconify';
import { lightboxClasses } from './classes';

import type { LightBoxProps } from './types';

const LightBox = ({
    slides,
    disableCaptions,
    disableFullscreen,
    disableSlideshow,
    disableVideo,
    disableZoom,
    disableThumbnails,
    disableTotal,
    onGetCurrentIndex,
    className,
    ...other
}: LightBoxProps) => {
    const totalItems = slides ? slides.length : 0;
    return (
        <ReactLightbox
            slides={slides}
            animation={{ swipe: 600 }}
            carousel={{ finite: totalItems < 5 }}
            controller={{ closeOnBackdropClick: true }}
            plugins={getPlugins({
                disableCaptions,
                disableFullscreen,
                disableSlideshow,
                disableVideo,
                disableZoom,
                disableThumbnails,
            })}
            render={{
                iconClose: () => <Iconify width={24} icon="carbon:close" />,
                iconEnterFullscreen: () => <Iconify width={24} icon="carbon:fit-to-screen" />,
                iconExitFullscreen: () => <Iconify width={24} icon="carbon:center-to-fit" />,
                iconSlideshowPlay: () => <Iconify width={24} icon="carbon:play" />,
                iconSlideshowPause: () => <Iconify width={24} icon="carbon:pause" />,
                iconZoomIn: () => <Iconify width={24} icon="carbon:zoom-in" />,
                iconZoomOut: () => <Iconify width={24} icon="carbon:zoom-out" />,
            }}
            toolbar={{
                buttons: [
                    <DisplayTotal key={0} totalItems={totalItems} disableTotal={disableTotal} />,
                    'close',
                ],
            }}
            on={{
                view: ({ index }: { index: number }) => {
                    if (onGetCurrentIndex) {
                        onGetCurrentIndex(index);
                    }
                },
            }}
            className={lightboxClasses.root.concat(className ? ` ${className}` : '')}
            {...other}
        />
    );
};

export default LightBox;

// ----------------------------------------------------------------------

export function getPlugins({
    disableZoom,
    disableVideo,
    disableCaptions,
    disableSlideshow,
    disableFullscreen,
    disableThumbnails,
}: Partial<LightBoxProps>) {
    let plugins = [Captions, Fullscreen, Slideshow, Video, Zoom, Thumbnails];

    if (disableCaptions) {
        plugins = plugins.filter((plugin) => plugin !== Captions);
    }
    if (disableFullscreen) {
        plugins = plugins.filter((plugin) => plugin !== Fullscreen);
    }
    if (disableSlideshow) {
        plugins = plugins.filter((plugin) => plugin !== Slideshow);
    }
    if (disableVideo) {
        plugins = plugins.filter((plugin) => plugin !== Video);
    }
    if (disableZoom) {
        plugins = plugins.filter((plugin) => plugin !== Zoom);
    }
    if (disableThumbnails) {
        plugins = plugins.filter((plugin) => plugin !== Thumbnails);
    }

    return plugins;
}

// ----------------------------------------------------------------------

type DisplayTotalProps = {
    totalItems: number;
    disableTotal?: boolean;
};

export function DisplayTotal({ totalItems, disableTotal }: DisplayTotalProps) {
    const { currentIndex } = useLightboxState();

    if (disableTotal) {
        return null;
    }

    return (
        <Box
            component="span"
            className="yarl__button"
            sx={{
                typography: 'body2',
                alignItems: 'center',
                display: 'inline-flex',
                justifyContent: 'center',
            }}
        >
            <strong> {currentIndex + 1} </strong> / {totalItems}
        </Box>
    );
}
