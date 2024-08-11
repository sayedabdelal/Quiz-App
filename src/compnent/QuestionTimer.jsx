import { useEffect, useState } from "react"

export default function QuestionTimer({timeout, onTimeOut}) {
    const [remainingTime, setRemaingingTime] = useState(timeout);

    useEffect(()=> {
        setTimeout((onTimeOut, timeout))

    }, [timeout, onTimeOut])

    useEffect (()=> {
        setInterval(()=> {
            setRemaingingTime((prevTime) => prevTime - 100)
            
        }, 100)
    }, [])

    return (
        <progress id="question-time" max={timeout} value={remainingTime}/>
    )

}