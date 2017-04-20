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

export const startListening = (roomName) => dispatch => {
    return dispatch({
        type: 'START_LISTENING',
        payload: {
            roomName
        }
    })
}

export const stopListening = () => dispatch => {
    return dispatch({
        type: 'STOP_LISTENING',
    })
}


export const changeRoomName = (roomName) => {
    return {
        type: 'CHANGE_ROOM_NAME',
        payload: roomName
    }
}