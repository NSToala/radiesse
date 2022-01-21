import React, { useRef } from 'react';
import { Player } from 'video-react';

export const VideoScreen = () => {
    // const { player } = this.refs.player.getState();
    // const currentTime = player.currentTime;
    // console.log(currentTime)
    const video = useRef(null);
    console.log(video);
    // console.log(video.current.manager.store.getState());
    // console.log(player.currentTime);
    
    const handleEndVideo = () => {
        const { player } = video.current.manager.store.getState();
        console.log(player.currentTime);
    }

    return (
        <div style={{width: '700px'}}>
            <Player autoPlay startTime={30} ref={video}>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            </Player>

            <div className="btn btn-success m-5" onClick={handleEndVideo}>Terminar</div>
        </div>
    );
};