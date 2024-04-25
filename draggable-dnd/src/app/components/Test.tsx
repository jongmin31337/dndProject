import Draggable from 'react-draggable';
export default function Test() {
    const handleStart = (item) => {
        console.log(item);
    }

    const handleDrag = (item) => {
        console.log(item);
    }

    const handleStop = (item) => {
        console.log(item);
    }

    return (
        <Draggable
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}>
            <div>1111111</div>
            <div>2222222</div>
            <div>3333333</div>
            <div>4444444</div>
        </Draggable>
    )
}