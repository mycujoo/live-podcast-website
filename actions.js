export const startRecording = (roomName) => dispatch => {
    return dispatch({
        type: 'START_RECORDING',
        payload: {
            roomName
        }
    })
}

export const stopRecording = () => dispatch => {
    return dispatch({
        type: 'STOP_RECORDING',
    })
}
