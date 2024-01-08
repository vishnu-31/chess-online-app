import { CountdownCircleTimer } from "react-countdown-circle-timer";


export const Timer =() =>{
    return(
        <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[60, 40, 10, 0]}
        >
            {({ remainingTime }) => <div className="text-2xl font-bold">{remainingTime}</div>}
        </CountdownCircleTimer>
    );
}